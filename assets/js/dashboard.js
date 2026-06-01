function calcularGanhosTotais(){
    const ganhos = getData('earnings')
    return ganhos.reduce((total,ganho) => total + ganho.earned,0)
}

function calcularDespesasTotais(){
    const despesas = getData('expenses')
    return despesas.reduce((total,despesa) => total + despesa.value,0)
}

function calcularLucroLiquedo(){
    return calcularGanhosTotais() - calcularDespesasTotais()
}

function calcularKmRodados(){
    const ganhos = getData('earnings')
    const KmGanhos = ganhos.reduce((total,ganho) => total + ganho.km,0)
    return KmGanhos
}

function renderDashboard(){
    const ganhosTotais = calcularGanhosTotais()
    const despesasTotais = calcularDespesasTotais()
    const lucroLiquido = calcularLucroLiquedo()
    const kmRodados = calcularKmRodados()
    document.getElementById('total-ganhos').textContent = 
    ganhosTotais.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    document.getElementById('total-despesas').textContent = 
        despesasTotais.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    document.getElementById('lucro-liquido').textContent = 
        lucroLiquido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    document.getElementById('km-rodados').textContent = 
        `${kmRodados.toLocaleString('pt-BR')} km`
}

document.addEventListener('DOMContentLoaded', renderDashboard)