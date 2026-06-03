"use client"
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react"
import BotaoPesquisar from "@/app/components/botaoPesquisar"
import BotaoCriarNovo from "@/app/components/botaoCriarNovo"
import BotaoExcluir from "../components/botaoExcluir";
import CriarDespesa from "./Despesa/modalCriarDespesa/criarDespesa"
import { listarDespesas } from "@/app/service/despesaService"
import { listarCategorias } from "@/app/service/categoriaService"
import { listarFormasPagamento } from "@/app/service/formaPagamentoService"
import { listarReceitas } from "@/app/service/receitaService"
import ExcluirDespesa from "./Despesa/modalExcluirDespesa/excluirDespesa"
import { formatarDinheiro } from "@/app/utils/formatadores"

export default function Inicio() {

    const [modalAberto, setModalAberto] = useState(false)
    const [despesas, setDespesas] = useState([])
    const [despesaEditando, setDespesaEditando] = useState(null)
    const [modalExcluirAberto, setModalExcluirAberto] = useState(false)
    const [abaAtiva, setAbaAtiva] = useState("despesas")
    const [mesAtual, setMesAtual] = useState(new Date().getMonth())
    const [anoAtual, setAnoAtual] = useState(new Date().getFullYear())
    const [tipoFiltro, setTipoFiltro] = useState("")
    const [valorFiltro, setValorFiltro] = useState("")
    const [categorias, setCategorias] = useState([])
    const [formasPagamento, setFormasPagamento] = useState([])
    const [filtroAtivo, setFiltroAtivo] = useState({ tipo: "", valor: "" })
    const [despesaAtualExcluir, setDespesaAtualExcluir] = useState(null)
    const [receitas, setReceitas] = useState([])

    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    
    const despesasFiltradas = despesas.filter((desp) => {
    if (!desp.dataVencimento) return false
    const data = new Date(desp.dataVencimento)
    if (data.getMonth() !== mesAtual || data.getFullYear() !== anoAtual) return false
    
    if (filtroAtivo.tipo === "categoria" && filtroAtivo.valor) {
        return desp.categoria?.id === Number(filtroAtivo.valor)
    }
    if (filtroAtivo.tipo === "formaPagamento" && filtroAtivo.valor) {
        return desp.formaPagamento?.id === Number(filtroAtivo.valor)
    }
    if (filtroAtivo.tipo === "status" && filtroAtivo.valor) {
        return desp.status === filtroAtivo.valor
    }
    return true
}).sort((desp1, desp2) => desp2.fixo - desp1.fixo)

    const todosAnos = [...new Set(
        despesas
            .filter((desp) => desp.dataVencimento)
            .map((desp) => new Date(desp.dataVencimento).getFullYear())
    )].sort((a, b) => a - b)

    const limiteGastoTotal = categorias.reduce((soma,cat) =>
        soma + Number(cat.limiteGasto)
    , 0)

    const totalReceitas = receitas.reduce((soma,rec) => 
        soma + Number(rec.valorSalario)
    ,0)

    const totalDespesas = despesas
    .filter((desp) => {
        if (!desp.dataVencimento) return false;

        const data = new Date(desp.dataVencimento);

        return (
        data.getMonth() === mesAtual &&
        data.getFullYear() === anoAtual
        );
    })
    .reduce((soma, desp) => {
        return soma + Number(desp.valor);
    }, 0);
    
    const totalRestante = totalReceitas - totalDespesas

    let mesAnterior = mesAtual === 0 ? 11 : mesAtual - 1
    let proximoMes = mesAtual === 11 ? 0 : mesAtual + 1

    async function buscarReceitas() {
        const dados = await listarReceitas(true)
        setReceitas(dados)
    }

    useEffect(() => {
        buscarReceitas()
    }, [])
    
    async function buscarDespesas(){
        const dados = await listarDespesas()
        setDespesas(dados)
    }

    useEffect(() => {
        buscarDespesas()
    }, [])

    async function buscarCategorias(){
        const dados = await listarCategorias(true)
        setCategorias(dados)
    }
    
    useEffect(() => {
        buscarCategorias()
    }, [])

    async function buscarFormasPagamento(){
        const dados = await listarFormasPagamento(true)
        setFormasPagamento(dados)
    }

    useEffect(() => {
        buscarFormasPagamento()
    }, [])

    function pesquisar(){
        setFiltroAtivo({ tipo: tipoFiltro, valor: valorFiltro })
    }

    return (
        <div className="min-h-screen bg-[#d1eed1] text-[#635B5B]">
            <div className="flex flex-row h-screen gap-6 mt-8">
                <div className="flex flex-col pt-6 px-4 w-60 shrink-0 h-screen bg-[#ffffff] rounded-tr-2xl shadow-sm">
                    <div className="flex flex-col">
                        <label className="text-md text-[#635B5B] mb-1">Selecione o Ano</label>
                        <select
                            value={anoAtual}
                            onChange={(e) => setAnoAtual(Number(e.target.value))}
                            className="w-full h-10 bg-[#E5F1DF] px-3 rounded-md outline-none focus:bg-white focus:border focus:border-[#78BC5F]">
                            {todosAnos.map((ano) => (
                                <option key={ano} value={ano}>{ano}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-12 font-semibold text-2xl">
                        <h3 className="text-[#055902]">Limite de Gastos</h3>
                        <p className="text-[#5470FF]">{formatarDinheiro(limiteGastoTotal)}</p>
                    </div>
                    <div className="mt-8 font-semibold text-2xl">
                        <h3 className="text-[#055902]">Receitas</h3>
                        <p className="text-[#66DA61]">{formatarDinheiro(totalReceitas)}</p>
                    </div>
                    <div className="mt-8 font-semibold text-2xl">
                        <h3 className="text-[#055902]">Despesas</h3>
                        <p className="text-[#ED6B5A]">{formatarDinheiro(totalDespesas)}</p>
                    </div>
                    <div className="mt-8 font-semibold text-2xl">
                        <h3 className="text-[#055902]">Total Restante</h3>
                        <p className={totalRestante <= limiteGastoTotal ? "text-[#66DA61]" : "text-[#ED6B5A]"}>{formatarDinheiro(totalRestante)}</p>
                    </div>

                </div>


                <div className="flex flex-col flex-1 min-w-0">
                    <div className="text-center text-2xl font-semibold mb-4 bg-[#ffffff] p-2 rounded-lg shadow-sm">{anoAtual}</div>
                    <div role="tablist" className="w-full h-screen bg-[#ffffff] rounded-t-2xl shadow-sm">
                            <div className="flex flex-row">
                                <button role="tab" className={`w-[50%] rounded-lg py-2 ${abaAtiva === "visaoGeral" ? "bg-[#69a955] text-[#ffffff]" : ""}`} onClick={() => setAbaAtiva("visaoGeral")}>Visão Geral</button>

                                <button role="tab" className={`w-[50%] rounded-lg py-2  ${abaAtiva === "despesas" ? "bg-[#69a955] text-[#ffffff]" : ""}`} onClick={() => setAbaAtiva("despesas")}>Despesas</button>    
                            </div>
                            
                            <div className="flex flex-row items-center justify-center p-6 mt-6">
                                <button  onClick={() => {
                                    if (mesAtual === 0) {
                                        setMesAtual(11);
                                        setAnoAtual(anoAtual - 1);
                                    } else {
                                        setMesAtual(mesAtual - 1);
                                    }
                                }}
                                className="p-1 rounded-md hover:bg-[#EEEEEE]"><ChevronLeft size={20} />
                                </button>

                                <div className="w-70 flex items-center justify-center h-8 text-base rounded-md">{meses[mesAnterior]}</div>

                                <div className="w-70 bg-[#78BC5F] flex items-center justify-center h-8 text-base text-white rounded-md">{meses[mesAtual]}</div>

                                <div className="w-70 flex items-center justify-center h-8 text-base rounded-md">{meses[proximoMes]}</div>

                                <button onClick={() => {
                                    if (mesAtual === 11) {
                                        setMesAtual(0);
                                        setAnoAtual(anoAtual + 1);
                                    } else {
                                        setMesAtual(mesAtual + 1);
                                    }
                                }} className="p-1 rounded-md hover:bg-[#EEEEEE]"><ChevronRight size={20} />
                                </button>
                            </div>
                            {abaAtiva === "despesas" && (
                            <>
                    <div className="flex flex-row items-end w-[90%] mx-auto p-2">
                        <div className="flex flex-row items-end gap-2">
                            <div className="flex flex-col">
                                <label className="text-[#635B5B] font-normal text-sm mt-3">Pesquisar por:</label>
                                <select value={tipoFiltro} className="w-45 h-10 bg-[#E5F1DF] py-1 px-1 rounded outline-none focus:bg-white focus:border focus:border-[#78BC5F]" onChange={(e) => setTipoFiltro(e.target.value)}>
                                    <option value=""></option>
                                    <option value="categoria">Categoria</option>
                                    <option value="formaPagamento">Forma de Pagamento</option>
                                    <option value="status">Status</option>
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-[#635B5B] font-normal text-sm mt-3">Opções</label>
                                <select value={valorFiltro} className="w-60 h-10 bg-[#E5F1DF] py-1 px-1 rounded outline-none focus:bg-white focus:border focus:border-[#78BC5F]" onChange={(e) => setValorFiltro(e.target.value)}>
                                    <option value=""></option>
                                        {tipoFiltro === "categoria" && categorias.map((cat) => (
                                            <option key={cat.id} value={cat.id}>{cat.nome}</option>
                                        ))}
                                        {tipoFiltro === "formaPagamento" && formasPagamento.map((fp) => (
                                            <option key={fp.id} value={fp.id}>{fp.nome}</option>
                                        ))}
                                        {tipoFiltro === "status" && (
                                            <>
                                                <option value="Não Pago" selected >Não Pago</option>
                                                <option value="Agendado">Agendado</option>
                                                <option value="Pago">Pago</option>
                                            </>
                                        )}
                                </select>
                            </div>
                            <BotaoPesquisar
                                onClick={pesquisar}
                            />
                        </div>
                        <BotaoCriarNovo
                            onClick={()=>setModalAberto(true)}
                        />
                    </div>
                    <div className="flex flex-col justify-center mx-8 w-[90%]">
                        <div className="flex flex-row w-full mt-8 px-2 text-sm">
                            <div className="flex-2">Nome</div>
                            <div className="flex-2">Categoria</div>
                            <div className="flex-1">Data Venc</div>
                            <div className="flex-1">For.Pag</div>
                            <div className="flex-1">Valor</div>
                            <div className="flex-1">Parc.</div>
                            <div className="flex-1">Status</div>
                            <div className="w-20"></div>
                        </div>

                        <div className="flex flex-col flex-1 overflow-y-auto">
                            {despesasFiltradas.map((desp) =>(
                                <div key={desp.id} className={`flex flex-row w-full items-center rounded px-2 py-1.5 my-1 ${desp.status === "Pago" ? "bg-[#E4FDE3]" : "bg-[#EEEEEE]"}`}>
                                    <div className="flex-2 font-semibold text-sm">{desp.nomeDespesa}</div>
                                    <div className="flex-2 text-sm">{desp.categoria?.nome}</div>
                                    <div className="flex-1 font-semibold text-sm">{desp.dataVencimento}</div>
                                    <div className="flex-1 text-sm">{desp.formaPagamento?.nome}</div>
                                    <div className="flex-1 font-semibold text-sm">{formatarDinheiro(desp.valor)}</div>
                                    <div className="flex-1 text-sm">{desp.parcelaAtual ? `${desp.parcelaAtual}/${desp.quantidadeParcelas}` : "-"}</div>
                                    <div className="flex-1 text-sm">{desp.status}</div>
                                    <div className="flex gap-2 w-20 justify-end">
                                        <button className="text-sm" onClick={() => { setDespesaEditando(desp); setModalAberto(true); }}>
                                            <img src="/Editar-icon.svg"/>
                                        </button>
                                        <BotaoExcluir
                                            onClick={ ()=> {setModalExcluirAberto(true); setDespesaAtualExcluir(desp)}}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
                )}

                            {abaAtiva === "visaoGeral" && (
                    <div className="p-6">
                        <div className="flex flex-col justify-center ml-8">

                            <div className="flex flex-row w-[90%] mx-2 mt-8 px-2 text-sm">
                                <div className="flex-1">Categoria</div>
                                <div className="flex-2">Lim. Gasto</div>
                                <div className="flex-1">Gastos</div>
                                <div className="flex-1">Valor Restante</div>
                            </div>
                            <div className="flex flex-col flex-1 overflow-y-auto">
                                {categorias.map((cat) => {
                                    const totalGasto = despesas
                                        .filter((desp) => {
                                            if (desp.categoria?.id !== cat.id) return false
                                            if (!desp.dataVencimento) return false
                                            const data = new Date(desp.dataVencimento)
                                            return data.getMonth() === mesAtual && data.getFullYear() === anoAtual
                                        })
                                        .reduce((soma, desp) => soma + Number(desp.valor), 0)

                                    return (
                                        <div
                                            key={cat.id}
                                            className="flex flex-row w-[90%] items-center mx-2 rounded px-2 py-1.5 my-1 bg-[#E4FDE3]">
                                            <div className="flex-1 font-semibold text-sm">
                                                {cat.nome}
                                            </div>
                                            <div className="flex-2 text-sm">
                                                {formatarDinheiro(cat.limiteGasto)}
                                            </div>
                                            <div className="flex-1 font-semibold text-sm">
                                                {formatarDinheiro(totalGasto)}
                                            </div>
                                            <div className="flex-1 text-sm">
                                                {formatarDinheiro(cat.limiteGasto - totalGasto)}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                        </div>
                    </div>
                )}
                            
                        </div>
                    </div>
                <div className="w-60 shrink-0 h-screen bg-[#ffffff] rounded-tl-2xl shadow-sm">

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
                fechar={() => { setModalExcluirAberto(false); setDespesaAtualExcluir(null)}}
                despesa={despesaAtualExcluir}
                atualizar={buscarDespesas}
            />
    )}

        </div>
)
}
