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

function renderDashboard() {
    const ganhosMes = filtrarMesAtual(getData('earnings'))
    const despesasMes = filtrarMesAtual(getData('expenses'))

    const ganhosTotais = ganhosMes.reduce((total, g) => total + g.earned, 0)
    const despesasTotais = despesasMes.reduce((total, d) => total + d.value, 0)
    const lucroLiquido = ganhosTotais - despesasTotais
    const kmRodados = ganhosMes.reduce((total, g) => total + g.km, 0)

    document.getElementById('total-ganhos').textContent =
        ganhosTotais.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    document.getElementById('total-despesas').textContent =
        despesasTotais.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    document.getElementById('lucro-liquido').textContent =
        lucroLiquido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    document.getElementById('km-rodados').textContent =
        `${kmRodados.toLocaleString('pt-BR')} km`
}

function filtrarMesAtual(registros){
    const hoje = new Date()
    const mesAtual = hoje.getMonth()
    const anoAtual = hoje.getFullYear()

    return registros.filter(registro => {
        const dataRegistro = new Date(registro.date)
        return dataRegistro.getMonth() === mesAtual && dataRegistro.getFullYear() === anoAtual

    })

}

document.addEventListener('DOMContentLoaded', renderDashboard)