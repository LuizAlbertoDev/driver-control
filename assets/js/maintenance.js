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

    const form = document.getElementById("expenses-form");

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

        renderMaintenance();
    });
}

function renderMaintenance() {

    const container = document.getElementById("maintenance-list");

    if (!container) return;

    const registros = getData("maintenance");

    container.innerHTML = "";

    if (registros.length === 0) {

        container.innerHTML = `
            <p>Nenhuma manutenção registrada.</p>
        `;

        return;
    }

    registros.forEach((registro, index) => {

        const card = document.createElement("div");

        card.classList.add("record-card");
        card.classList.add("maintenance-record");

        card.innerHTML = `
            <p><strong>Peça:</strong> ${registro.peca}</p>
            <p><strong>Data:</strong> ${registro.date}</p>
            <p><strong>KM da troca:</strong> ${registro.kmTroca.toLocaleString('pt-BR')} km</p>
            <p><strong>Próxima troca:</strong> ${registro.proximaTroca.toLocaleString('pt-BR')} km</p>
            <p><strong>Custo:</strong> ${registro.custo.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })}</p>

            <button class="btn btn--danger" onclick="deleteMaintenance(${index})">
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
}

document.addEventListener("DOMContentLoaded", () => {

    preencherSelectPecas();

    setupMaintenanceForm();

    renderMaintenance();
});