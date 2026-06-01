const PECAS = [
    { id: 'oleo-motor', nome: 'Óleo do Motor', intervaloKm: 5000 },
    { id: 'filtro-oleo', nome: 'Filtro de Óleo', intervaloKm: 5000 },
    { id: 'filtro-ar', nome: 'Filtro de Ar', intervaloKm: 10000 },
    { id: 'filtro-combustivel', nome: 'Filtro de Combustível', intervaloKm: 10000 },
    { id: 'pastilhas-freio', nome: 'Pastilhas de Freio', intervaloKm: 25000 },
    { id: 'discos-freio', nome: 'Discos de Freio', intervaloKm: 60000 },
    { id: 'fluido-freio', nome: 'Fluido de Freio', intervaloKm: 20000 },
    { id: 'amortecedores', nome: 'Amortecedores', intervaloKm: 60000 },
    { id: 'velas', nome: 'Velas', intervaloKm: 30000 },
    { id: 'correia-dentada', nome: 'Correia Dentada', intervaloKm: 50000 },
    { id: 'correia-acessorios', nome: 'Correia de Acessórios', intervaloKm: 50000 },
    { id: 'oleo-cambio', nome: 'Óleo do Câmbio', intervaloKm: 60000 },
    { id: 'pneus', nome: 'Pneus', intervaloKm: 50000 }
];

function preencherSelectPecas() {
    const selectPeca = document.getElementById("peca");
    if (!selectPeca) return;

    PECAS.forEach(peca => {
        const option = document.createElement("option");
        option.value = peca.id;
        option.textContent = peca.nome;
        selectPeca.appendChild(option);
    });
}

function setupMaintenanceForm() {
    // CORREÇÃO: Buscando agora o ID correto do formulário da página
    const form = document.getElementById("maintenance-form");
    if (!form) return;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const pecaId = document.getElementById("peca").value;
        const kmAtual = Number(document.getElementById("kmAtualVeiculo").value);
        const custo = Number(document.getElementById("valor-despesa").value);
        const data = document.getElementById("date").value;

        const peca = PECAS.find(p => p.id === pecaId);
        if (!peca) {
            alert("Selecione uma peça.");
            return;
        }

        const proximaTroca = kmAtual + peca.intervaloKm;

        const registro = {
            peca: peca.nome,
            pecaId: peca.id,
            kmTroca: kmAtual,
            proximaTroca,
            custo,
            date: data
        };

        const registros = getData("maintenance");
        registros.push(registro);
        saveData("maintenance", registros);

        form.reset();
        
        // Atualiza as duas listagens na tela
        renderMaintenance();
        renderMaintenanceStatus();
    });
}

function renderMaintenanceStatus() {
    const container = document.getElementById("maintenance-status");
    if (!container) return;

    const registros = getData("maintenance");

    if (registros.length === 0) {
        container.innerHTML = `<p style="color: gray; font-style: italic;">Nenhum alerta disponível. Registre uma manutenção para iniciar o rastreamento.</p>`;
        return;
    }

    // Encontra o KM atual mais alto registrado para servir de base para o veículo
    const kmAtualGeral = Math.max(...registros.map(r => r.kmTroca), 0);

    // Agrupa o último registro feito para cada tipo de peça
    const ultimosRegistrosPorPeca = {};
    registros.forEach(registro => {
        ultimosRegistrosPorPeca[registro.pecaId] = registro;
    });

    container.innerHTML = "";

    // Cria os cards de status baseados no desgaste atual
    Object.values(ultimosRegistrosPorPeca).forEach(registro => {
        const kmRestantes = registro.proximaTroca - kmAtualGeral;
        
        let statusClass = "status--safe";
        let statusTexto = `Faltam ${kmRestantes.toLocaleString('pt-BR')} km para a troca`;

        // Define o nível de criticidade
        if (kmRestantes <= 0) {
            statusClass = "status--danger";
            statusTexto = `VENCIDO há ${Math.abs(kmRestantes).toLocaleString('pt-BR')} km!`;
        } else if (kmRestantes <= 1000) {
            statusClass = "status--warning";
            statusTexto = `Atenção! Troca próxima (restam ${kmRestantes.toLocaleString('pt-BR')} km)`;
        }

        const statusCard = document.createElement("div");
        statusCard.className = `status-card ${statusClass}`;
        statusCard.innerHTML = `
            <div class="status-card__header">
                <strong><i class="fa-solid fa-gears"></i> ${registro.peca}</strong>
                <span class="status-badge">${statusTexto}</span>
            </div>
            <div class="status-card__details">
                <p>Próxima troca prevista: <strong>${registro.proximaTroca.toLocaleString('pt-BR')} km</strong></p>
                <p class="status-card__history">Último valor pago: <span>${registro.custo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span> (como base)</p>
            </div>
        `;
        container.appendChild(statusCard);
    });
}

function renderMaintenance() {
    const container = document.getElementById("maintenance-list");
    if (!container) return;

    const registros = getData("maintenance");
    container.innerHTML = "";

    if (registros.length === 0) {
        container.innerHTML = `<p>Nenhuma manutenção registrada.</p>`;
        return;
    }

    // Inverte o array para mostrar os mais novos primeiro
    [...registros].reverse().forEach((registro, reversedIndex) => {
        // Redescobre o index original correspondente para a exclusão funcionar certinho
        const originalIndex = registros.length - 1 - reversedIndex;

        const card = document.createElement("div");
        card.classList.add("record-card", "maintenance-record");

        card.innerHTML = `
            <p><strong>Peça:</strong> ${registro.peca}</p>
            <p><strong>Data:</strong> ${registro.date}</p>
            <p><strong>KM da troca:</strong> ${registro.kmTroca.toLocaleString('pt-BR')} km</p>
            <p><strong>Próxima troca:</strong> ${registro.proximaTroca.toLocaleString('pt-BR')} km</p>
            <p><strong>Custo:</strong> ${registro.custo.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })}</p>

            <button class="btn btn--danger" onclick="deleteMaintenance(${originalIndex})">
                Excluir
            </button>
        `;
        container.appendChild(card);
    });
}

function deleteMaintenance(index) {
    const registros = getData("maintenance");
    registros.splice(index, 1);
    saveData("maintenance", registros);

    renderMaintenance();
    renderMaintenanceStatus(); // Atualiza também o painel de status após deletar
}

document.addEventListener("DOMContentLoaded", () => {
    preencherSelectPecas();
    setupMaintenanceForm();
    renderMaintenance();
    renderMaintenanceStatus(); // Roda o painel de status logo ao abrir a página
});