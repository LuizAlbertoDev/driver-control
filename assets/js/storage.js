// Salva dados no localStorage
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}

// Busca dados do localStorage
function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || []
}