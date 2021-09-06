const incomeSection = document.querySelector(".income-container");
const expensesSection = document.querySelector(".expenses-container");
const availableMoney = document.querySelector(".available-money");
const addTransactionPanel = document.querySelector(".add-transaction-panel");

const nameInput = document.querySelector("#name");
const amountInput = document.querySelector("#amount");
const categorySelect = document.querySelector("#category");
const incomeBox = document.querySelector("#income-box");
const expenseBox = document.querySelector("#expense-box");

const addTransactionBtn = document.querySelector(".add-transaction");
const saveBtn = document.querySelector(".save");
const cancelBtn = document.querySelector(".cancel");
const deleteBtn = document.querySelector(".delete");
const deleteAllBtn = document.querySelector(".delete-all");

const lightBtn = document.querySelector(".light");
const darkBtn = document.querySelector(".dark");

let root = document.documentElement;
let ID = 0;
let moneyArr = [0];

const showForm = () => {
  addTransactionPanel.classList.toggle("active");
};

const closeForm = () => {
  addTransactionPanel.classList.toggle("active");
  clearForm();
};

const checkForm = () => {
  if (nameInput.value !== "" && amountInput.value !== "") {
    createTransaction();
  } else {
    alert("complete the form to add transaction!");
  }

  closeForm();
};

const clearForm = () => {
  nameInput.value = "";
  amountInput.value = "";
};

const createTransaction = () => {
  const newTransaction = document.createElement("div");
  newTransaction.classList.add("transaction");
  newTransaction.setAttribute("id", ID);

  newTransaction.innerHTML = `<p class="transaction-name">
   ${nameInput.value}
</p>
<p class="transaction-amount">
  ${amountInput.value}
  <button class="delete" onClick='deleteTransaction(${ID})'><i class="fas fa-times"></i></button>
</p>`;

  if (incomeBox.checked === true) {
    incomeSection.appendChild(newTransaction);
    newTransaction.classList.add("income");
  } else if (expenseBox.checked === true) {
    expensesSection.appendChild(newTransaction);
    newTransaction.classList.add("expense");
    amountInput.value = `-${amountInput.value}`;
  }

  moneyArr.push(parseFloat(amountInput.value));
  countMoney(moneyArr);
  ID++;
  clearForm();
};

const countMoney = (money) => {
  const newMoney = money.reduce((a, b) => a + b);
  availableMoney.textContent = `${newMoney}PLN`;
};

const deleteTransaction = (id) => {
  const transactionToDelete = document.getElementById(id);
  const transactionAmount = parseFloat(
    transactionToDelete.childNodes[2].innerText
  );
  const indexOfTransaction = moneyArr.indexOf(transactionAmount);

  moneyArr.splice(indexOfTransaction, 1);
  transactionToDelete.classList.contains("income")
    ? incomeSection.removeChild(transactionToDelete)
    : expensesSection.removeChild(transactionToDelete);

  countMoney(moneyArr);
};

const deleteAll = () => {
  incomeSection.innerHTML = "<h3>Income</h3>";
  expensesSection.innerHTML = "<h3>Expenses</h3>";
  availableMoney.textContent = "0PLN";
};

const themeToLight = () => {
  root.classList.remove("dark");
};

const themeToDark = () => {
  root.classList.add("dark");
};

saveBtn.addEventListener("click", checkForm);
addTransactionBtn.addEventListener("click", showForm);
deleteAllBtn.addEventListener("click", deleteAll);
cancelBtn.addEventListener("click", closeForm);
lightBtn.addEventListener("click", themeToLight);
darkBtn.addEventListener("click", themeToDark);
