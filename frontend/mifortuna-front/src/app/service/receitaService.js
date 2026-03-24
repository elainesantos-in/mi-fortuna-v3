const API_URL = "http://localhost:3000"

export async function criarReceita(dados) {
    const response = await fetch(`${API_URL}/receitas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(dados)
    })
    return response.json()
}

export async function listarReceitas(ativo,nome) {
    let url = `${API_URL}/receitas?ativo=${ativo}`

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

export async function atualizarReceita(id, dados) {
    const response = await fetch(`${API_URL}/receitas/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(dados)
    })
    return response.json()
}

