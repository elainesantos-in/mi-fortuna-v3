"use client"
import {X} from "lucide-react"
import { useState } from "react"
import Input from "../../../components/input"
import { atualizarReceita, criarReceita } from "../../../service/receitaService"

export default function CriarReceitas({fechar, atualizar, receita}){
    const [nome, setNome] = useState(receita?.nome ||"")
    const [valorSalario, setValorSalario] = useState(receita?.valorSalario || "")
    const [ativo, setAtivo] = useState(receita?.ativo ?? true)

    async function Salvar(){
        const dados = {
            nome: nome,
            valorSalario: Number(valorSalario),
            ativo: ativo
        }
        
        if(receita){
            await atualizarReceita(receita.id, dados)
        } else {
            await criarReceita(dados)
        }
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
                <h2>{receita ? "Editar Receita/Sálario" : "Cadastrar Receita"}</h2>
            </div>
            <div className="p-6">
                <div>
                    <Input
                        nome="Nome da Receita"
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>
                <div className="mt-6">
                    <Input
                        nome="Valor Receita"
                        type="number"
                        value={valorSalario}
                        onChange={(e) => setValorSalario(e.target.value)}
                    />
                </div>
                <div className="flex flex-row mt-6">
                    <input type="checkbox" className="mr-2" checked={ativo} onChange={(e) => setAtivo(e.target.checked)} />
                    <label>Ativado</label>
                </div>
                
            <button onClick={Salvar} className="bg-[#78BC5F] text-[#FFFFFF] text-base w-full py-2 rounded mt-6">{receita ? "Salvar" : "Cadastrar"}</button>
            </div>
        </div>
    </div>
    )
}