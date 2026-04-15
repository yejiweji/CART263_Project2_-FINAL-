document.addEventListener("DOMContentLoaded", function () {

    const pricePerTicket = 10;
    const quantitySelect = document.getElementById("quantity");
    const identitySelect = document.getElementById("identity");
    const totalPrice = document.getElementById("totalPrice");
    const buyButton = document.getElementById("buyButton");
    const enterButton = document.getElementById("enterMuseumButton"); // Moved to top

    function calculateTotal() {
        const quantity = parseInt(quantitySelect.value);
        const identity = identitySelect.value;
        let total = quantity * pricePerTicket;

        if (identity === "yes") {
            total += 5;
        }
        return total;
    }

    function updateTotal() {
        totalPrice.textContent = calculateTotal();
    }

    quantitySelect.addEventListener("change", updateTotal);
    identitySelect.addEventListener("change", updateTotal);

    updateTotal();

    // 1. Logic for clicking "Buy Ticket"
    buyButton.addEventListener("click", function () {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const quantity = quantitySelect.value;
        const total = calculateTotal();

        if (name === "" || email === "") {
            alert("Please fill in all fields.");
            return;
        }

        const confirmationMessage = `
            ${name}, you have successfully purchased ${quantity} ticket(s).<br>
            Total Paid: $${total}
        `;

        document.getElementById("confirmationMessage").innerHTML = confirmationMessage;
        document.getElementById("confirmationModal").style.display = "block"; // Show modal ONLY on click
    });

    // 2. Logic for clicking "Welcome to our museum" (redirect)
    enterButton.addEventListener("click", function() {
        window.location.href = "museum/index.html"; 
    });

});

//Function must be OUTSIDE the DOMContentLoaded block so the HTML "onclick" can find it
function closeModal() {
    document.getElementById("confirmationModal").style.display = "none";
}