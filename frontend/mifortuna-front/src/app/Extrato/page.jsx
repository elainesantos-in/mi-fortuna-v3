"use client"

import { useState, useEffect } from "react"
import { listarDespesas } from "@/app/service/despesaService"


export default function Despesas(){

    
    const [despesas , setDespesas] = useState([])
    
    const nomeDespesas = despesas.map((desp) => {
                return desp.nomeDespesa
        }
    )
    console.log(nomeDespesas)
    
    const naoPagas = despesas
    .filter(desp => desp.status !== 'Pago')
    .reduce((soma,desp) => soma + desp.valor,0)
    .map((desp) => {return desp.nomeDespesa})

    async function buscarDespesas(){
        const dados = await listarDespesas()
        setDespesas(dados)
    }

    useEffect(() => {
        buscarDespesas()
    },[])
    
    return(
        <div className="min-h-screen bg-[#F0FFF0] text-[#635B5B]">
            <p>Despesas não pagas: {naoPagas.length}</p>
            <p>{naoPagas.join(", ")}</p>
        </div>
    )
}