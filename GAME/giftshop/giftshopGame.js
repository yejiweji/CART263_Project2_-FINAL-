document.addEventListener('DOMContentLoaded', () => {
    const claw = document.getElementById('claw');
    const moveLeftBtn = document.getElementById('move-left');
    const moveRightBtn = document.getElementById('move-right');
    const dropBtn = document.getElementById('drop-claw');
    
    let clawPosition = 135; // Starting center position

    moveLeftBtn.addEventListener('click', () => {
        if (clawPosition > 10) {
            clawPosition -= 20;
            claw.style.left = clawPosition + 'px';
        }
    });

    moveRightBtn.addEventListener('click', () => {
        if (clawPosition < 260) {
            clawPosition += 20;
            claw.style.left = clawPosition + 'px';
        }
    });

    dropBtn.addEventListener('click', () => {
        // Drop animation
        claw.style.top = '280px';
        
        setTimeout(() => {
            // Check for collision with prizes here
            alert("Checking for prizes...");
            claw.style.top = '0px'; // Return claw
        }, 1000);
    });
});