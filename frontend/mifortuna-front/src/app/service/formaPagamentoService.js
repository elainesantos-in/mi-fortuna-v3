const API_URL = "http://localhost:3000"

export async function criarFormaPagamento(dados) {
    const response = await fetch(`${API_URL}/formapagamento`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    })
    return response.json()
}

export async function listarFormasPagamento(ativo,nome) {
    let url = `${API_URL}/formapagamento?ativo=${ativo}`

    if (nome){
    url += `&nome=${nome}`
    }

    const response = await fetch(url)
    return response.json()
}

export async function atualizarFormaPagamento(id, dados) {
    const response = await fetch(`${API_URL}/formapagamento/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    })
    return response.json()
}

