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

function renderDashboardMaintenanceAlerts() {
    const container = document.getElementById("dashboard-maintenance-status");
    if (!container) return;

    const registros = getData("maintenance") || [];

    if (registros.length === 0) {
        container.innerHTML = `<p style="color: gray; font-style: italic; font-size: 0.9rem;">Nenhuma manutenção registrada. Tudo em dia por aqui!</p>`;
        return;
    }

    // Encontra o KM atual mais alto registrado para servir de base
    const kmAtualGeral = Math.max(...registros.map(r => r.kmTroca), 0);

    // Agrupa o último registro feito para cada tipo de peça
    const ultimosRegistrosPorPeca = {};
    registros.forEach(registro => {
        ultimosRegistrosPorPeca[registro.pecaId] = registro;
    });

    container.innerHTML = "";

    // Filtra apenas as peças que estão VENCIDAS ou em ATENÇÃO (menos de 1000km)
    const pecasComAlerta = Object.values(ultimosRegistrosPorPeca).filter(registro => {
        const kmRestantes = registro.proximaTroca - kmAtualGeral;
        return kmRestantes <= 1000;
    });

    if (pecasComAlerta.length === 0) {
        container.innerHTML = `<p style="color: #2ecc71; font-weight: 500; font-size: 0.9rem;"><i class="fa-solid fa-circle-check"></i> Todas as peças estão com a revisão em dia!</p>`;
        return;
    }

    pecasComAlerta.forEach(registro => {
        const kmRestantes = registro.proximaTroca - kmAtualGeral;
        
        let statusClass = "status--warning";
        let statusTexto = `Atenção (restam ${kmRestantes.toLocaleString('pt-BR')} km)`;

        if (kmRestantes <= 0) {
            statusClass = "status--danger";
            statusTexto = `VENCIDO há ${Math.abs(kmRestantes).toLocaleString('pt-BR')} km!`;
        }

        const statusCard = document.createElement("div");
        statusCard.className = `status-card ${statusClass}`;
        statusCard.style.padding = "12px 16px";
        
        statusCard.innerHTML = `
            <div class="status-card__header" style="margin-bottom: 4px;">
                <strong><i class="fa-solid fa-gears"></i> ${registro.peca}</strong>
                <span class="status-badge">${statusTexto}</span>
            </div>
            <div class="status-card__details">
                <p style="font-size: 0.85rem;">Trocar com: <strong>${registro.proximaTroca.toLocaleString('pt-BR')} km</strong> | Último gasto: ${registro.custo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            </div>
        `;
        container.appendChild(statusCard);
    });
}

// CORREÇÃO: Agora o evento inicializa as duas funções em conjunto ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    renderDashboard();
    renderDashboardMaintenanceAlerts();
});