"use client"
import {X} from "lucide-react"
import { useState } from "react"
import Input from "../../../components/input"
import { criarCategoria } from "../../../service/categoriaService"

export default function CriarCategorias({fechar, atualizar}){
    const [nome, setNome] = useState("")
    const [limiteGasto, setLimiteGasto] = useState("")
    const [ativo, setAtivo] = useState(true)

    async function Cadastrar(){
        await criarCategoria({
            nome: nome,
            limiteGasto: Number(limiteGasto),
            ativo: ativo
        })
        atualizar()
        fechar()
    }
    return(
        <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white w-[40%] shadow-2xl  rounded-2xl p-6">
            <div className="flex justify-end">
                <button className="flex items-end"  onClick={fechar}><X/></button>
            </div>
            <div className="flex justify-center">
                <h2 className="font-semibold text-lg">Cadastrar Categoria</h2>
            </div>
            <div className="p-6">
                <div>
                    <Input
                        nome="Nome"
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>
                <div className="mt-6">
                    <Input
                        nome="Limite de Gastos"
                        type="number"
                        value={limiteGasto}
                        onChange={(e) => setLimiteGasto(e.target.value)}
                    />
                </div>
                <div className="flex flex-row mt-6">
                    <input type="checkbox" className="mr-2" checked={ativo} onChange={(e) => setAtivo(e.target.checked)} />
                    <label>Ativado</label>
                </div>
                
            <button onClick={Cadastrar} className="bg-[#78BC5F] text-[#FFFFFF] text-base w-full py-2 rounded mt-6">Cadastrar</button>
            </div>
        </div>
    </div>
    )
}