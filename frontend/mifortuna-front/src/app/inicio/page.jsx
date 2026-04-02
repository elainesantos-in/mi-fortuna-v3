"use client"
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react"
import BotaoPesquisar from "@/app/components/botaoPesquisar"
import BotaoCriarNovo from "@/app/components/botaoCriarNovo"
import BotaoExcluir from "../components/botaoExcluir";
import CriarDespesa from "./Despesa/modalCriarDespesa/criarDespesa"
import { listarDespesas } from "@/app/service/despesaService"
import ExcluirDespesa from "./Despesa/modalExcluirDespesa/excluirDespesa"

export default function Inicio() {

    const [modalAberto, setModalAberto] = useState(false)
    const [despesas, setDespesas] = useState([])
    const [despesaEditando, setDespesaEditando] = useState(null)
    const [despesasSelecionadas, setDespesasSelecionadas] = useState([])
    const [modalExcluirAberto, setModalExcluirAberto] = useState(false)
    const [abaAtiva, setAbaAtiva] = useState("despesas")
    const [mesAtual, setMesAtual] = useState(new Date().getMonth())
    const [anoAtual, setAnoAtual] = useState(new Date().getFullYear())

    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    
    let mesAnterior = mesAtual === 0 ? 11 : mesAtual - 1
    let proximoMes = mesAtual === 11 ? 0 : mesAtual + 1
    
    async function buscarDespesas(){
        const dados = await listarDespesas()
        setDespesas(dados)
    }

    useEffect(() => {
        buscarDespesas()
    }, [])

    return (
        <div className="min-h-screen bg-[#F0FFF0] text-[#635B5B] mb-">
            <div className="flex flex-row h-screen justify-between mt-8">
                <div className="w-60 h-screen bg-[#ffffff] rounded-tr-2xl shadow-sm">

                </div>
                
                <div role="tablist" className="w-250 h-screen bg-[#ffffff] rounded-t-2xl shadow-sm">
                        <div className="flex flex-row">
                            <button role="tab" className={`w-[50%] rounded-lg py-2 ${abaAtiva === "visaoGeral" ? "bg-[#E5F1DF]" : ""}`} onClick={() => setAbaAtiva("visaoGeral")}>Visão Geral</button>

                            <button role="tab" className={`w-[50%] rounded-lg py-2 ${abaAtiva === "despesas" ? "bg-[#E5F1DF]" : ""}`} onClick={() => setAbaAtiva("despesas")}>Despesas</button>    
                        </div>
                        <div className="flex flex-row items-center justify-center p-6 mt-6">
                            <button onClick={() => setMesAtual(mesAtual === 0 ? 11 : mesAtual - 1)}
                            className="p-1 rounded-md hover:bg-[#EEEEEE]"><ChevronLeft size={20} />
                            </button>

                            <div className="w-70 flex items-center justify-center h-8 text-base rounded-md">{meses[mesAnterior]}</div>

                            <div className="w-70 bg-[#78BC5F] flex items-center justify-center h-8 text-base text-white rounded-md">{meses[mesAtual]}</div>

                            <div className="w-70 flex items-center justify-center h-8 text-base rounded-md">{meses[proximoMes]}</div>

                            <button onClick={() => setMesAtual(mesAtual === 11 ? 0 : mesAtual + 1)} className="p-1 rounded-md hover:bg-[#EEEEEE]"><ChevronRight size={20} /></button>
                        </div>
                        {abaAtiva === "despesas" && (
                        <>
                            <div className="flex flex-row items-end w-[85%] mx-auto p-2">
                                <div className="flex flex-row items-end gap-2">
                                    <div className="flex flex-col">
                                        <label className="text-[#635B5B] font-normal text-sm mt-3">Pesquisar por:</label>
                                        <select className="w-32 bg-[#E5F1DF] py-1 px-1 rounded outline-none focus:bg-white focus:border focus:border-[#78BC5F]">
                                            <option value="true"></option>
                                            <option value="true">Categoria</option>
                                            <option value="false">Forma de Pagamento</option>
                                            <option value="false">Status</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-[#635B5B] font-normal text-sm mt-3">Opções</label>
                                        <select className="w-60 bg-[#E5F1DF] py-1 px-1 rounded outline-none focus:bg-white focus:border focus:border-[#78BC5F]">
                                            <option value="true"></option>
                                            <option value="true">Categoria</option>
                                            <option value="false">Forma de Pagamento</option>
                                            <option value="false">Status</option>
                                        </select>
                                    </div>
                                    <BotaoPesquisar
                                        // onClick={() => buscarCategorias(status,nome)}
                                    />
                                </div>
                                <BotaoCriarNovo
                                    onClick={()=>setModalAberto(true)}
                                />
                                <BotaoExcluir
                                    onClick={()=>setModalExcluirAberto(true)}
                                    disabled={despesasSelecionadas.length === 0}
                                />
                            </div>
                            <div className="flex flex-col justify-center ml-8">
                                <div className="flex flex-row w-[90%] items-star mt-8 ml-7 px-2 text-sm ">
                                    <div className="flex-2">Categorias</div>
                                    <div className="flex-1">Nome</div>
                                    <div className="flex-1">Data Venc</div>
                                    <div className="flex-1">For.Pag</div>
                                    <div className="flex-1">Valor</div>
                                    <div className="flex-1">Status</div>
                                </div>

                                <div className="flex flex-col flex-1 overflow-y-auto">
                                    {despesas.map((desp) =>(
                                        <div key={desp.id} className="flex flex-row items-center">
                                            <input type="checkbox" className="m-2"
                                                checked={despesasSelecionadas.includes(desp.id)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setDespesasSelecionadas([...despesasSelecionadas, desp.id])
                                                    } else {
                                                        setDespesasSelecionadas(despesasSelecionadas.filter(id => id !== desp.id))
                                                    }
                                                }}
                                            />
                                            <div className="flex flex-row w-[90%] items-center mx-2 rounded px-2 py-1.5 my-1 bg-[#E4FDE3]">
                                                <div className="flex-2 font-semibold">{desp.categoria?.nome}</div>
                                                <div className="flex-1">{desp.nomeDespesa}</div>
                                                <div className="flex-1 font-semibold">{desp.dataVencimento}</div>
                                                <div className="flex-1 w-2">{desp.formaPagamento?.nome}</div>
                                                <div className="flex-1 font-semibold">{desp.valor}</div>
                                                <div className="flex-1 w-2">{desp.status}</div>
                                                <button className="ml-auto" onClick={() => { setDespesaEditando(desp); setModalAberto(true); }}>
                                                    <img src="/Editar-icon.svg"></img>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                        )}

                        {abaAtiva === "visaoGeral" && (
                            <div className="p-6">
                                <p>Visão Geral - em construção</p>
                            </div>
                        )}
                    </div>
                <div className="w-60 h-screen bg-[#ffffff] rounded-tl-2xl shadow-sm">

                </div>
            </div>
            {modalAberto && (
                <CriarDespesa 
                    fechar={() => { setModalAberto(false); setDespesaEditando(null); }} 
                    atualizar={buscarDespesas} 
                    despesa={despesaEditando} 
                />
            )}
            {modalExcluirAberto && (
            <ExcluirDespesa 
                fechar={() => { setModalExcluirAberto(false); setDespesasSelecionadas([]); }}
                ids={despesasSelecionadas}
                atualizar={buscarDespesas}
            />
)}

        </div>
    )
}
