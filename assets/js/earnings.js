function renderEarnings() {
    const earnings = getData('earnings')
    const earningList = document.getElementById('earnings-list')

    if (!earningList) return

    earningList.innerHTML = ''

    if (earnings.length === 0) {
        earningList.innerHTML = '<p>Nenhum registro encontrado.</p>'
        return
    }

    earnings.forEach((earning) => {
        const earningItem = document.createElement('div')
        earningItem.classList.add('earning-item')
        earningItem.innerHTML = `
            <p><strong>Data:</strong> ${earning.date}</p>
            <p><strong>Plataforma:</strong> ${earning.platform}</p>
            <p><strong>KM rodados:</strong> ${earning.km}</p>
            <p><strong>Valor ganho:</strong> ${Number(earning.earned).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            <p><strong>Combustível:</strong> ${Number(earning.fuel).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        `
        earningList.appendChild(earningItem)
    })
}

function setupEarningsForm() {
    const form = document.getElementById('earnings-form')

    if (!form) return

    form.addEventListener('submit', function(event) {
        event.preventDefault()

        const registro = {
            date: document.getElementById('date').value,
            platform: document.getElementById('platform').value,
            km: Number(document.getElementById('km').value),
            earned: Number(document.getElementById('earned').value),
            fuel: Number(document.getElementById('fuel').value)
        }

        const registros = getData('earnings')
        registros.push(registro)
        saveData('earnings', registros)

        form.reset()
        renderEarnings()
    })
}
