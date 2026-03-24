"use client"
import {X} from "lucide-react"
import { useState } from "react"
import Input from "../../../components/input"
import { atualizarFormaPagamento, criarFormaPagamento } from "../../../service/formaPagamentoService"

export default function CriarFormasPagamento({fechar, atualizar, formaPagamento}){
    const [nome, setNome] = useState(formaPagamento?.nome ||"")
    const [tipoPag, setTipoPag] = useState(formaPagamento?.tipoPagamento || "")
    const [ativo, setAtivo] = useState(formaPagamento?.ativo ?? true)

    async function Salvar(){
        const dados = {
            nome: nome,
            tipoPagamento: tipoPag,
            ativo: ativo
        }
        
        if(formaPagamento){
            await atualizarFormaPagamento(formaPagamento.id, dados)
        } else {
            await criarFormaPagamento(dados)
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
                <h2>{formaPagamento ? "Editar" : "Cadastrar"}</h2>
            </div>
            <div className="p-6">
                <div>
                    <Input
                        nome="Forma de Pagamento"
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>
                <div className="flex flex-col mt-5">
                    <label className="text-[#635B5B] font-normal text-base mt-6">Tipos de pagamento</label>
                        <select value={tipoPag} 
                        onChange={(e) => setTipoPag(e.target.value)} className="w-full bg-[#E5F1DF] mt-1 py-1 px-1 rounded outline-none focus:bg-white focus:border focus:border-[#78BC5F]">
                            <option value="Dinheiro">Dinheiro</option>
                            <option   value="Conta Bancária / PIX">Conta Bancária / Pix</option>
                            <option value="Cartão de Crédito">Cartão de Crédito</option>
                            <option value="Cartão de Débito">Cartão de Débito</option>
                        </select>
                </div>
                <div className="flex flex-row mt-6">
                    <input type="checkbox" className="mr-2" checked={ativo} onChange={(e) => setAtivo(e.target.checked)} />
                    <label>Ativado</label>
                </div>
                
            <button onClick={Salvar} className="bg-[#78BC5F] text-[#FFFFFF] text-base w-full py-2 rounded mt-6">{formaPagamento ? "Salvar" : "Cadastrar"}</button>
            </div>
        </div>
    </div>
    )
}