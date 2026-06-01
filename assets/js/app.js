if (typeof setupEarningsForm === 'function') {
    setupEarningsForm()
    renderEarnings()
}

if (typeof setupExpensesForm === 'function') {
    setupExpensesForm()
    renderExpenses()
}

if (typeof renderDashboard === 'function') {
    renderDashboard()
}