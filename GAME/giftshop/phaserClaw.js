const config = {
    type: Phaser.AUTO,
    width: 300,
    height: 380,
    parent: "phaser-game",
    backgroundColor: "#ffe3f1",
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },   // IMPORTANT: we control movement manually
            debug: false
        }
    },
    scene: { create }
};

new Phaser.Game(config);

let clawX = 150;
let clawY = 60;

let claw, cable;
let toys = [];
let grabbed = null;
let busy = false;
let coins = 10;
let coinText;

function create() {

    // ================= UI =================
    coinText = this.add.text(10, 10, "🪙 Coins: 10", {
        fontSize: "16px",
        color: "#ff4fa3"
    });

    // ================= FLOOR VISUAL ONLY =================
    this.add.rectangle(150, 370, 300, 20, 0xffc1dd);

    // ================= CABLE =================
    cable = this.add.rectangle(clawX, 0, 4, 40, 0xffffff)
        .setOrigin(0.5, 0);

    // ================= CLAW =================
    claw = this.add.container(clawX, clawY);

    const center = this.add.circle(0, 0, 6, 0xffffff);
    const leftArm = this.add.rectangle(-10, 10, 6, 35, 0xffffff).setAngle(25);
    const rightArm = this.add.rectangle(10, 10, 6, 35, 0xffffff).setAngle(-25);

    claw.add([center, leftArm, rightArm]);

    // ================= TOYS (REAL BALLS) =================
    for (let i = 0; i < 18; i++) {

        let ball = this.add.circle(
            Phaser.Math.Between(40, 260),
            Phaser.Math.Between(200, 340),
            12,
            Phaser.Display.Color.RandomRGB().color
        );

        this.physics.add.existing(ball);
        ball.body.setBounce(0.6);
        ball.body.setCollideWorldBounds(true);

        ball.body.setVelocity(
            Phaser.Math.Between(-20, 20),
            Phaser.Math.Between(-10, 10)
        );

        toys.push(ball);
    }

    // ================= BUTTONS =================
    document.getElementById("leftBtn").onclick = () => move(-30);
    document.getElementById("rightBtn").onclick = () => move(30);
    document.getElementById("dropBtn").onclick = () => play.call(this);
}

// ================= MOVE CLAW =================
function move(dir) {
    if (busy) return;

    clawX = Phaser.Math.Clamp(clawX + dir, 40, 260);

    claw.x = clawX;
    cable.x = clawX;
}

// ================= GAME LOOP =================
async function play() {

    if (busy) return;

    if (coins <= 0) {
        alert("No coins left!");
        return;
    }

    coins--;
    coinText.setText("🪙 Coins: " + coins);

    busy = true;
    grabbed = null;

    // reset position
    claw.y = 60;
    cable.height = 40;

    // ================= DROP =================
    for (let i = 0; i < 80; i++) {
        claw.y += 2;
        cable.height += 2;
        await wait(10);
    }

    grabCheck();

    // ================= LIFT =================
    for (let i = 0; i < 80; i++) {
        claw.y -= 2;
        cable.height -= 2;

        if (grabbed) {
            grabbed.x = claw.x;
            grabbed.y = claw.y + 20;
        }

        await wait(10);
    }

    // ================= RETURN =================
    while (Math.abs(claw.x - 150) > 2) {

        claw.x += (150 - claw.x) * 0.1;
        cable.x = claw.x;

        if (grabbed) {
            grabbed.x = claw.x;
            grabbed.y = claw.y + 20;
        }

        await wait(16);
    }

    // ================= RESULT =================
    if (grabbed) {
        grabbed.destroy();
        coins += 2;
        coinText.setText("🪙 Coins: " + coins);
        alert("YOU WON! 🎉 +2 coins");
    }

    busy = false;
}

// ================= GRAB CHECK =================
function grabCheck() {
    for (let t of toys) {

        if (!grabbed) {
            let d = Phaser.Math.Distance.Between(
                t.x, t.y,
                claw.x, claw.y
            );

            if (d < 22) {
                grabbed = t;
                t.body.enable = false;
                break;
            }
        }
    }
}

function wait(ms) {
    return new Promise(r => setTimeout(r, ms));
}