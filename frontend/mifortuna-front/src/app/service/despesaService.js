const API_URL = "http://localhost:3000"

export async function criarDespesa(dados) {
    const response = await fetch(`${API_URL}/despesas`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(dados)
    })
    return response.json()
}

export async function listarDespesas(nome) {
    let url = `${API_URL}/despesas?`

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

export async function atualizarDespesa(id, dados) {
    const response = await fetch(`${API_URL}/despesas/${id}`, {
        method: "PATCH",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}` 
        },
        body: JSON.stringify(dados)
    })
    return response.json()
}

export async function excluirDespesa(id){
    const response = await fetch(`${API_URL}/despesas/${id}`, 
    {
        method: "DELETE",
        headers:{
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
    })
    return response.ok
}
