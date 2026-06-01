function setupExpensesForm() {
  const form = document.getElementById("expenses-form")
  if (!form) return

  form.addEventListener("submit", function(event) {
    event.preventDefault()

    const expense = {
        date: document.getElementById("date").value,
        category: document.getElementById("categoria").value,
        value: Number(document.getElementById("valor-despesa").value),
        description: document.getElementById("descricao-despesa").value,
        vehicleKm: Number(document.getElementById("kmAtualVeiculo").value)
    }

    const expenses = getData("expenses")
    expenses.push(expense)
    saveData("expenses", expenses)

    form.reset()
    renderExpenses()
  })
}

function renderExpenses() {
  const expenses = getData("expenses")
  const expensesList = document.getElementById("expenses-list")

  if (!expensesList) return

  expensesList.innerHTML = ""

  if (expenses.length === 0) {
    expensesList.innerHTML = "<p>Nenhuma despesa registrada.</p>"
    return
  }

  expenses.forEach((expense) => {
    const expenseItem = document.createElement("div")
    expenseItem.classList.add("expense-item")
    expenseItem.innerHTML = `
      <p><strong>Data:</strong> ${expense.date}</p>
      <p><strong>Categoria:</strong> ${expense.category}</p>
      <p><strong>Valor:</strong> ${Number(expense.value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
      <p><strong>Descrição:</strong> ${expense.description}</p>
      <p><strong>KM Atual:</strong> ${expense.vehicleKm} km</p>
    `
    expensesList.appendChild(expenseItem)
  })
}

setupExpensesForm()
renderExpenses()