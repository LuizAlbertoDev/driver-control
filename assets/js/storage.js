// Persistência local para a versão frontend do Driver Control.
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getData(key) {
    try {
        const saved = JSON.parse(localStorage.getItem(key));
        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
}

// Escapa dados de usuário antes de colocá-los em templates HTML.
function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }[char]));
}
