function setupExpensesForm() {

    const form = document.getElementById("expenses-form");

    if (!form) return;

    form.addEventListener("submit", function(event) {

        event.preventDefault();

        const expense = {
            date: document.getElementById("date").value,
            category: document.getElementById("categoria").value,
            value: Number(document.getElementById("valor-despesa").value),
            description: document.getElementById("descricao-despesa").value,
            vehicleKm: Number(document.getElementById("kmAtualVeiculo").value)
        };

        const expenses = getData("expenses");

        expenses.push(expense);

        saveData("expenses", expenses);

        form.reset();

        renderExpenses();
    });
}

function renderExpenses() {

    const expenses = getData("expenses");

    const expensesList = document.getElementById("expenses-list");

    if (!expensesList) return;

    expensesList.innerHTML = "";

    if (expenses.length === 0) {

        expensesList.innerHTML = `
            <p>Nenhuma despesa registrada.</p>
        `;

        return;
    }

    expenses.forEach((expense, index) => {

        const expenseItem = document.createElement("div");

        expenseItem.classList.add("record-card");
        expenseItem.classList.add(`expense-${expense.category}`);

        expenseItem.innerHTML = `
            <p><strong>Data:</strong> ${expense.date}</p>

            <p><strong>Categoria:</strong> ${
                expense.category.charAt(0).toUpperCase() +
                expense.category.slice(1)
            }</p>

            <p><strong>Valor:</strong>
                ${expense.value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}
            </p>

            <p><strong>Descrição:</strong> ${expense.description}</p>

            <p><strong>KM Atual:</strong>
                ${expense.vehicleKm.toLocaleString("pt-BR")} km
            </p>

            <button
                class="btn btn--danger"
                onclick="deleteExpense(${index})"
            >
                Excluir
            </button>
        `;

        expensesList.appendChild(expenseItem);
    });
}

function deleteExpense(index) {

    const expenses = getData("expenses");

    expenses.splice(index, 1);

    saveData("expenses", expenses);

    renderExpenses();
}
