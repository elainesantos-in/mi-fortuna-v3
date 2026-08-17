"use client"

// import { useState, useEffect } from "react"
// import { listarDespesas } from "@/app/service/despesaService"


export default function Despesas(){

    /* --- EM CONSTRUÇÃO: descomentar quando a tela estiver pronta ---
    const [despesas , setDespesas] = useState([])

    const naoPagas = despesas
        .filter(desp => desp.status !== 'Pago')
        .map((desp) => desp.nomeDespesa)

    async function buscarDespesas(){
        const dados = await listarDespesas()
        setDespesas(dados)
    }

    useEffect(() => {
        buscarDespesas()
    },[])
    --- fim do trecho comentado --- */

    return(
        <div className="min-h-screen bg-[#F0FFF0] text-[#635B5B]">
            <p>Extrato em construção 🚧</p>
        </div>
    )
}