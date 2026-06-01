const form = document.getElementById('earnings-form')

form.addEventListener('submit', function(event) {
  event.preventDefault()

  // Lê os valores do formulário
  const registro = {
    date: document.getElementById('date').value,
    platform: document.getElementById('platform').value,
    km: document.getElementById('km').value,
    earned: document.getElementById('earned').value,
    fuel: document.getElementById('fuel').value
  }

  // Busca registros já salvos (ou array vazio se não tiver nenhum)
  const registrosSalvos = localStorage.getItem('earnings')
  const registros = registrosSalvos ? JSON.parse(registrosSalvos) : []

  // Adiciona o novo registro
  registros.push(registro)

  // Salva de volta no localStorage como texto JSON
  localStorage.setItem('earnings', JSON.stringify(registros))

  form.reset()

  renderEarnings() // Atualiza a lista de registros na página

  console.log('Registros salvos:', registros)

})

function renderEarnings(){
    const earnings = JSON.parse(localStorage.getItem("earnings")) || []
    const earningList = document.getElementById("earnings-list")

    earningList.innerHTML = ""

    if (earnings.length === 0) {
        earningList.innerHTML = "<p>Nenhum registro encontrado.</p>"
        return
    }

    earnings.forEach((earning, index) => {
        const earningItem = document.createElement("div")
        earningItem.classList.add("earning-item")
        earningItem.innerHTML = `
            <p><strong>Data:</strong> ${earning.date}</p>
            <p><strong>Plataforma:</strong> ${earning.platform}</p>
            <p><strong>KM rodados:</strong> ${earning.km}</p>
            <p><strong>Valor ganho:</strong> ${Number(earning.earned).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            <p><strong>Gasto com combustível:</strong> ${Number(earning.fuel).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        `
        earningList.appendChild(earningItem)
    })
}

renderEarnings() // <- adiciona no final do arquivo