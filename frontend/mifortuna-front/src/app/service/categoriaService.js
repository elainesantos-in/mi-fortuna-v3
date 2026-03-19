const API_URL = "http://localhost:3000"

export async function criarCategoria(dados) {
    const response = await fetch(`${API_URL}/categorias`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    })
    return response.json()
}

export async function listarCategorias(ativo,nome) {
    let url = `${API_URL}/categorias?ativo=${ativo}`

    if (nome){
    url += `&nome=${nome}`
    }

    const response = await fetch(url)
    return response.json()
}

export async function atualizarCategoria(id, dados) {
    const response = await fetch(`${API_URL}/categorias/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    })
    return response.json()
}

export async function deletarCategoria(id) {
    const response = await fetch(`${API_URL}/categorias/${id}`, {
        method: "DELETE"
    })
    return response.json()
}
