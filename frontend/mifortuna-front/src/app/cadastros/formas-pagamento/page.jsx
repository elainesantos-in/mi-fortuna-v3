"use client"
import SeletorStatus from "@/app/components/seletorStatus"
import Input from "../../components/input"
import BotaoPesquisar from "@/app/components/botaoPesquisar"
import BotaoCriarNovo from "@/app/components/botaoCriarNovo"
import CriarFormaPagamento from "./modalCriarFormaPagamento/criarFormaPagamento"
import { useState, useEffect } from "react"
import { listarFormasPagamento } from "../../service/formaPagamentoService"

export default function FormasPagamento(){

    const [modalAberto, setModalAberto] = useState(false)
    const [formasPagamento, setFormasPagamento] = useState([])
    const [status, setStatus] = useState("true")
    const [nome, setNome] = useState("")
    const [formaPagamentoEditando, setFormaPagamentoEditando] = useState(null)

    async function buscarFormasPagamento(status,nome){
        if(status !== undefined){
            const dados = await listarFormasPagamento(status,nome)
        setFormasPagamento(dados)
        }
    }

    useEffect(() => {
        buscarFormasPagamento(status,nome)
    }, [])


    return(
        <div className="h-[calc(100vh-72px)] flex flex-col bg-[#F0FFF0] pt-10 text-[#635B5B]">
            <div className="w-[80%] mx-auto flex-1 bg-white rounded-t-2xl pt-4 flex flex-col overflow-hidden">
                <h1 className="flex justify-center text-xl font-semibold p-4">Formas de Pagamento</h1>
                <div className="flex flex-row items-end w-[85%] mx-auto">
                    <div className="flex flex-row items-end gap-2">
                        <SeletorStatus 
                            value={status} 
                            onChange={(s) => setStatus(s.target.value)}
                        />
                        <Input
                            nome="Pesquisar"
                            type="text"
                            value={nome}
                            onChange={(n) => setNome(n.target.value)}
                        />
                        <BotaoPesquisar 
                            onClick={() => buscarFormasPagamento(status,nome)}
                        />
                    </div>
                    <BotaoCriarNovo onClick={()=>setModalAberto(true)}/>
                </div>
                <div className="flex flex-row w-[85%] items-start mx-auto mt-8 px-2 ">
                    <div className="flex-1">Forma de Pagamento</div>
                    <div className="flex-1"></div>
                    <div className="flex-1 text-center">Tipo Pagamento</div>
                    <div className="flex-1"></div>
                </div>

                <div className="flex flex-col justify-start pb-14 flex-1 overflow-y-auto">
                    {formasPagamento.map((fp) =>(  
                        <div key={fp.id} className={`flex flex-row w-[85%] items-start mx-auto rounded px-2 py-1 mt-2 ${fp.ativo ? 'bg-[#E4FDE3]' : 'bg-[#EEEEEE]'}`}>

                            <div className="flex-1">{fp.nome}</div>
                            <div className="flex-1 mr-2"></div>
                            <div className="flex-1 text-center">{fp.tipoPagamento}</div>
                            <div className="flex-1 "></div>
                            <button className="ml-auto" onClick={()=> {setFormaPagamentoEditando(fp), setModalAberto(true)}}>
                                <img src="/Editar-icon.svg" alt="" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center">
                {modalAberto &&<CriarFormaPagamento
                    fechar={() => {setModalAberto(false);setFormaPagamentoEditando(null);}}
                    atualizar={() => buscarFormasPagamento(status)} 
                   formaPagamento={formaPagamentoEditando}
                />}
            </div>
       
        </div>
    )
}