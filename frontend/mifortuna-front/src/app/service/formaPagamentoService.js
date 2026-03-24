const API_URL = "http://localhost:3000"

export async function criarFormaPagamento(dados) {
    const response = await fetch(`${API_URL}/forma-pagamento`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(dados)
    })
    return response.json()
}

export async function listarFormasPagamento(ativo,nome) {
    let url = `${API_URL}/forma-pagamento?ativo=${ativo}`

    if (nome){
    url += `&nome=${nome}`
    }

    const response = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    return response.json()
}

export async function atualizarFormaPagamento(id, dados) {
    const response = await fetch(`${API_URL}/forma-pagamento/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(dados)
    })
    return response.json()
}

