const API_URL = "http://localhost:3000";

export async function login(email, senha) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
    });

    if (!response.ok) {
        throw new Error("Email ou senha inválidos");
    }

    const data = await response.json();
    localStorage.setItem("token", data.access_token);
    return data;
}

export async function cadastrar(nome, dataNascimento, email, senha) {
    const response = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, dataNascimento, email, senha }),
    });

    if (!response.ok) {
        throw new Error("Erro ao cadastrar");
    }

    return response.json();
}