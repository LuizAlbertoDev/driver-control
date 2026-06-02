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

// Marca o link ativo no nav
const links = document.querySelectorAll('.header__nav a')

links.forEach(link => {
    if (window.location.pathname.includes(link.getAttribute('href').replace('..', ''))) {
        link.classList.add('active')
    }
})