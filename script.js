// Get modal elements
const modal = document.getElementById('donationModal');
const customAmountContainer = document.getElementById('customAmountContainer');
const customAmountInput = document.getElementById('customAmount');
const donationAmountButtons = document.getElementById('donationAmountButtons');
const totalAmountDisplay = document.getElementById('totalAmount');
const paymentTypeSelect = document.getElementById('payment-type');
const monthsContainer = document.getElementById('months-container');
const monthsSelect = document.getElementById('months');

// Base fee and initial values
let selectedAmount = 0;
let numberOfMonths = 1;

// Populate months selector with options from 1 to 36
function populateMonthsSelector() {
    monthsSelect.innerHTML = '';
    for (let i = 1; i <= 36; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        monthsSelect.appendChild(option);
    }
}

// Call populate function when page loads
document.addEventListener('DOMContentLoaded', function() {
    populateMonthsSelector();
});

// Function to toggle months selector visibility based on payment type
function toggleMonthsSelector() {
    if (paymentTypeSelect.value === 'monthly') {
        monthsContainer.style.display = 'block';
        numberOfMonths = parseInt(monthsSelect.value);
    } else {
        monthsContainer.style.display = 'none';
        numberOfMonths = 1;
    }
    updateTotalAmount();
}

// Function to open the modal with selected amount
function openModal(amount) {
    modal.style.display = 'block';

    // Reset all buttons to default state
    const buttons = document.querySelectorAll('.donation-amount-btn');
    buttons.forEach(btn => {
        btn.classList.remove('selected');
    });

    // Hide custom amount input by default
    customAmountContainer.style.display = 'none';
    donationAmountButtons.style.display = 'flex';
    
    // Reset payment type to single
    paymentTypeSelect.value = 'single';
    toggleMonthsSelector();

    if (amount === 'other') {
        // Show custom amount input and hide buttons
        customAmountContainer.style.display = 'block';
        donationAmountButtons.style.display = 'none';
        customAmountInput.focus();
        // Select the "other" button
        document.querySelector('.donation-amount-btn[data-amount="other"]').classList.add('selected');
        selectedAmount = 0;
    } else if (amount !== 'main') {
        // Select the button with the specified amount
        selectedAmount = parseInt(amount);
        document.querySelector(`.donation-amount-btn[data-amount="${amount}"]`).classList.add('selected');
    }

    updateTotalAmount();
}

// Function to close the modal
function closeModal() {
    modal.style.display = 'none';
}

// Add click event listeners to donation amount buttons
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.donation-amount-btn').forEach(button => {
        button.addEventListener('click', function () {
            const amount = this.getAttribute('data-amount');

            // Remove 'selected' class from all buttons
            document.querySelectorAll('.donation-amount-btn').forEach(btn => {
                btn.classList.remove('selected');
            });

            // Add 'selected' class to the clicked button
            this.classList.add('selected');

            if (amount === 'other') {
                // Show custom amount input and hide buttons
                customAmountContainer.style.display = 'block';
                donationAmountButtons.style.display = 'none';
                customAmountInput.focus();
                selectedAmount = 0;
            } else {
                // Hide custom amount input and show buttons
                customAmountContainer.style.display = 'none';
                donationAmountButtons.style.display = 'flex';
                selectedAmount = parseInt(amount);
            }

            updateTotalAmount();
        });
    });

    // Add input event listener to custom amount input
    customAmountInput.addEventListener('input', function () {
        selectedAmount = parseInt(this.value) || 0;
        updateTotalAmount();
    });

    // Add change event listener to months select
    monthsSelect.addEventListener('change', function() {
        numberOfMonths = parseInt(this.value);
        updateTotalAmount();
    });
});

// Function to update the total amount display
function updateTotalAmount() {
    let total = selectedAmount * numberOfMonths;
    totalAmountDisplay.textContent = `₪ ${total.toFixed(2)}`;
}

// Close the modal if clicked outside the modal content
window.onclick = function (event) {
    if (event.target === modal) {
        closeModal();
    }
};

// Add event listener for ESC key to close the modal
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});