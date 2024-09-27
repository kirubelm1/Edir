// Get elements
const paymentForm = document.getElementById('paymentForm');
const paymentTable = document.getElementById('paymentTable').getElementsByTagName('tbody')[0];

// Retrieve payment data from localStorage or initialize an empty array
let payments = JSON.parse(localStorage.getItem('payments')) || [];

// Function to add payment to the table
function addPaymentToTable(payment, index) {
  const newRow = paymentTable.insertRow();

  newRow.insertCell(0).textContent = payment.name;
  newRow.insertCell(1).textContent = payment.month;
  newRow.insertCell(2).textContent = payment.paymentDate;
  newRow.insertCell(3).textContent = payment.amountPaid;
  newRow.insertCell(4).textContent = payment.otherAmount;
  newRow.insertCell(5).textContent = payment.status;

  const actionsCell = newRow.insertCell(6);
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.className = 'remove-btn';
  removeBtn.addEventListener('click', () => removePayment(index));
  actionsCell.appendChild(removeBtn);
}

// Function to render all payments from localStorage
function renderPayments() {
  paymentTable.innerHTML = '';
  payments.forEach((payment, index) => {
    addPaymentToTable(payment, index);
  });
}

// Function to save payments to localStorage
function savePayments() {
  localStorage.setItem('payments', JSON.stringify(payments));
}

// Function to remove payment
function removePayment(index) {
  payments.splice(index, 1);
  savePayments();
  renderPayments();
}

// Handle form submission
paymentForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Get form values
  const name = document.getElementById('name').value;
  const month = document.getElementById('month').value;
  const paymentDate = document.getElementById('paymentDate').value;
  const amountPaid = document.getElementById('amountPaid').value;
  const otherAmount = document.getElementById('otherAmount').value;
  const status = document.getElementById('status').value;

  const payment = {
    name,
    month,
    paymentDate,
    amountPaid,
    otherAmount,
    status
  };
  payments.push(payment);

  savePayments();
  renderPayments();
  paymentForm.reset();
});
renderPayments();
