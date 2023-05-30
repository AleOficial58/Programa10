let expenses = [];
let totalExpenses = 0;

// Cargar datos almacenados al cargar la página
window.addEventListener("load", loadExpenses);

function loadExpenses() {
  if (localStorage.getItem("expenses")) {
    expenses = JSON.parse(localStorage.getItem("expenses"));
    totalExpenses = parseFloat(localStorage.getItem("totalExpenses"));
    displayExpenses();
    updateTotalExpense();
  }
}

function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
  localStorage.setItem("totalExpenses", totalExpenses.toFixed(2));
}

function addExpense() {
  const productInput = document.getElementById("product");
  const expenseInput = document.getElementById("expense");

  const product = productInput.value;
  const expense = parseFloat(expenseInput.value);

  if (product && expense) {
    const expenseItem = {
      product: product,
      expense: expense
    };

    expenses.push(expenseItem);
    totalExpenses += expense;

    displayExpenses();
    updateTotalExpense();

    saveExpenses();

    // Limpiar los campos de entrada
    productInput.value = "";
    expenseInput.value = "";
  }
}

function displayExpenses() {
  const expenseList = document.getElementById("expenseList");
  expenseList.innerHTML = "";

  expenses.forEach((expenseItem) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${expenseItem.product}: $${expenseItem.expense}`;
    expenseList.appendChild(listItem);
  });
}

function updateTotalExpense() {
  const totalExpense = document.getElementById("totalExpense");
  totalExpense.textContent = totalExpenses.toFixed(2);
}

function clearExpenses() {
  expenses = [];
  totalExpenses = 0;
  displayExpenses();
  updateTotalExpense();
  saveExpenses();
}
