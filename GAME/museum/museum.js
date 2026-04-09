document.addEventListener('DOMContentLoaded', () => {
    const doorBox = document.getElementById('korean-door-box');
    const closedDoor = document.getElementById('korean_door');
    const openDoor = document.getElementById('korean_door_open');
    const storeFront = document.getElementById('korean_store');

    if (doorBox) {
        doorBox.addEventListener('click', () => {
            // Hide the door images
            closedDoor.style.display = 'none';
            openDoor.style.display = 'none';

            // Show the storefront
            storeFront.style.display = 'block';

            // Optional: Disable the hover cursor since the transition is done
            doorBox.style.cursor = 'default';
        });
    }
});