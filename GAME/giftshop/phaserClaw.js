const config = {
    type: Phaser.AUTO,
    width: 300,
    height: 380,
    parent: "phaser-game",
    backgroundColor: "#ffe3f1",
    physics: {
        default: "arcade",
        arcade: { gravity: { y: 800 }, debug: false }
    },
    scene: { preload, create, update } 
};

const game = new Phaser.Game(config);

let cable, joint, armL, armR;
let toys = [];
let grabbed = null;
let isBusy = false;
let coins = 10;
let timeLeft = 5;
let timerRunning = false;
let moveDir = 0;
let bgMusic; // Variable to hold the background music

function preload() {
    // Load the fortune cookie image
    this.load.image('cookie', '../assets/image/fortune.cookie.png');
    
    // Load the daydream background music
    this.load.audio('daydream', '../assets/sound/massobeats - daydream (freetouse.com).mp3');
}

function create() {
    const scene = this;

    // --- Audio Implementation ---
    // Start playing the daydream music on a loop
    bgMusic = this.sound.add('daydream', { volume: 0.5, loop: true });
    bgMusic.play();

    // 1. HIGHER 3D FLOOR
    const floor = this.add.rectangle(150, 350, 300, 60, 0xffc1dd);
    this.physics.add.existing(floor, true); 

    // 2. COOKIES 
    for (let i = 0; i < 22; i++) {
        let x = Phaser.Math.Between(40, 260);
        let y = Phaser.Math.Between(240, 310);
        
        let ball = this.physics.add.sprite(x, y, 'cookie');
        ball.setScale(0.05); 
        
        ball.body.setBounce(0.2).setCollideWorldBounds(true);
        this.physics.add.collider(ball, floor);
        this.physics.add.collider(ball, toys);
        toys.push(ball);
    }

    // 3. CLAW ASSEMBLY
    cable = this.add.rectangle(150, 0, 4, 60, 0xffffff).setOrigin(0.5, 0);
    joint = this.add.circle(150, 60, 10, 0xffffff);
    armL = this.add.rectangle(140, 75, 6, 30, 0xffffff).setAngle(20);
    armR = this.add.rectangle(160, 75, 6, 30, 0xffffff).setAngle(-20);

    // 4. INPUTS
    document.getElementById("leftBtn").onmousedown = () => { if(!isBusy) { moveDir = -1; startCountdown(scene); }};
    document.getElementById("rightBtn").onmousedown = () => { if(!isBusy) { moveDir = 1; startCountdown(scene); }};
    window.addEventListener('mouseup', () => { moveDir = 0; });
    document.getElementById("dropBtn").onclick = () => { if (!isBusy) executeGrab(scene); };
}

function update() {
    const tx = cable.x;
    const ty = cable.height;
    joint.setPosition(tx, ty);
    armL.setPosition(tx - 10, ty + 15);
    armR.setPosition(tx + 10, ty + 15);

    if (!isBusy && moveDir !== 0) {
        cable.x = Phaser.Math.Clamp(cable.x + (moveDir * 3.5), 35, 265);
    }

    if (grabbed) {
        grabbed.x = tx;
        grabbed.y = ty + 22;
        grabbed.body.setVelocity(0); 
        
        if (isBusy && Math.random() < 0.002) {
            grabbed.body.setAllowGravity(true);
            grabbed = null;
        }
    }
}

// ... the rest of your functions (startCountdown, executeGrab, returnToHome) remain unchanged

function startCountdown(scene) {
    if (timerRunning || isBusy) return;
    timerRunning = true;
    timeLeft = 5;
    const display = document.getElementById("timerText");
    const interval = setInterval(() => {
        if (isBusy) { clearInterval(interval); display.innerText = ""; timerRunning = false; return; }
        display.innerText = `⏱️ ${timeLeft}s`;
        if (timeLeft <= 0) { clearInterval(interval); display.innerText = ""; timerRunning = false; executeGrab(scene); }
        timeLeft--;
    }, 1000);
}

function executeGrab(scene) {
    if (isBusy || coins <= 0) return;
    isBusy = true;
    coins--;
    document.getElementById("coinCount").innerText = "🪙 Coins: " + coins;

    scene.tweens.add({
        targets: cable,
        height: 310,
        duration: 1000,
        ease: 'Cubic.easeIn',
        onComplete: () => {
            // Grab check with success rate (30%)
            if (Math.random() < 0.3) {
                for (let t of toys) {
                    if (t.active && Phaser.Math.Distance.Between(t.x, t.y, cable.x, cable.height + 15) < 35) {
                        grabbed = t;
                        t.body.setAllowGravity(false).setVelocity(0);
                        break;
                    }
                }
            }
            scene.tweens.add({
                targets: cable,
                height: 60,
                duration: 1000,
                delay: 200,
                onComplete: () => returnToHome(scene)
            });
        }
    });
}

function returnToHome(scene) {
    scene.tweens.add({
        targets: cable,
        x: 150,
        duration: 1200,
        onComplete: () => {
            if (grabbed) {
                grabbed.destroy();
                grabbed = null;
                coins += 2;
                document.getElementById("coinCount").innerText = "🪙 Coins: " + coins;
                alert("YOU WON! 🎁");
            }
            isBusy = false;
        }
    });
}