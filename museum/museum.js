document.addEventListener('DOMContentLoaded', () => {
    // --- Audio Setup ---
    // Paths are relative to the location of museum.js (inside GAME/museum/)
    const koreanBell = new Audio('../assets/sound/no29bell.mp3');
    const chineseBell = new Audio('../assets/sound/chinesebell.mp3');

    // --- Korean Door Logic ---
    const koreanDoorBox = document.getElementById('korean-door-box');
    const closedKoreanDoor = document.getElementById('korean_door');
    const openKoreanDoor = document.getElementById('korean_door_open');
    const koreanStoreFront = document.getElementById('korean_store');

    if (koreanDoorBox) {
        // Play sound on hover
        koreanDoorBox.addEventListener('mouseenter', () => {
            koreanBell.currentTime = 0; // Reset sound to start if hovered quickly
            koreanBell.play();
        });

        // Existing click logic to show store
        koreanDoorBox.addEventListener('click', () => {
            closedKoreanDoor.style.display = 'none';
            openKoreanDoor.style.display = 'none';
            koreanStoreFront.style.display = 'block';
            koreanDoorBox.style.cursor = 'default';
        });
    }

    // --- Chinese Door Logic ---
    const chineseDoorBox = document.getElementById('chinese-door-box');

    if (chineseDoorBox) {
        // Play sound on hover
        chineseDoorBox.addEventListener('mouseenter', () => {
            chineseBell.currentTime = 0;
            chineseBell.play();
        });
        
        // You can add similar click logic here if needed for the Chinese door
    }
});