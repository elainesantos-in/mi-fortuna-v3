"use client"
import {X} from "lucide-react"
import { useState, useEffect } from "react"
import Input from "@/app/components/input"
import { atualizarDespesa, criarDespesa } from "@/app/service/despesaService"
import { listarCategorias } from "@/app/service/categoriaService"
import { listarFormasPagamento } from "@/app/service/formaPagamentoService"

export default function CriarDespesa({fechar, atualizar, despesa}){
    const [nomeDespesa, setNomeDespesa] = useState(despesa?.nome ||"")
    const [valor, setValor] = useState(despesa?.valor||"")
    const [categoria, setCategoria] = useState(despesa?.categoria || "")
    const [formaPagamento, setFormaPagamento] = useState(despesa?.formaPagamento || "")
    const [recorrencia, setRecorrencia] = useState(despesa?.recorrencia || "")
    const [quantidadeParcelas, setQuantidadeParcelas] = useState(despesa?.quantParcelas || "")
    const [dataVencimento, setDataVencimento] = useState(despesa?.dataVencimento || "")
    const [status, setStatus] = useState(despesa?.status || "")
    const [fixo, setFixo] = useState(despesa?.fixo ?? true)

    const [categorias, setCategorias] = useState([])
    const [formasPagamento, setFormasPagamento] = useState([])

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


    async function Salvar(){
        const dados = {
            nomeDespesa: nomeDespesa,
            valor: parseFloat(valor) || 0,
            categoria: parseInt(categoria) || null,
            formaPagamento: parseInt(formaPagamento) || null,
            recorrencia: recorrencia || null,
            quantidadeParcelas: quantidadeParcelas ? parseInt(quantidadeParcelas) : null,
            dataVencimento: dataVencimento || null,
            status: status,
            fixo: fixo,
        }
        
        if(despesa){
            await atualizarDespesa(despesa.id, dados)
        } else {
            await criarDespesa(dados)
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
                <h2>{despesa ? "Editar" : "Cadastrar"}</h2>
            </div>
            <div className="p-6">
                <div className="flex flex-row">
                    <div className="w-[55%] mr-1">
                        <Input
                        nome="Nome da Despesa"
                        type="text"
                        value={nomeDespesa}
                        onChange={(e) => setNomeDespesa(e.target.value)}
                    />
                    </div>
                    
                    <div className="w-[40%] ">
                        <Input
                        nome="Valor"
                        type="number"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                    />
                    </div>
                    
                </div>
                <div className="flex flex-row">
                    <div className="flex flex-col mt-1 w-[55%] mr-1">
                        <label className="text-[#635B5B] font-normal text-base mt-4">Categoria</label>
                            <select value={categoria} 
                            onChange={(e) => setCategoria(e.target.value)} className="w-full bg-[#E5F1DF] mt-1 py-1 px-1 rounded outline-none focus:bg-white focus:border focus:border-[#78BC5F] h-8">
                                <option value=""></option>
                                {categorias.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.nome}
                                    </option>
                                ))}
                            </select>
                    </div>
                    <div className="flex flex-col mt-1 w-[40%]">
                        <label className="text-[#635B5B] font-normal text-base mt-4">Forma de Pagamento</label>
                            <select value={formaPagamento} 
                            onChange={(e) => setFormaPagamento(e.target.value)} className="w-full bg-[#E5F1DF] mt-1 py-1 px-1 rounded outline-none focus:bg-white focus:border focus:border-[#78BC5F] h-8">
                                <option value=""></option>
                                {formasPagamento.map((fp) => (
                                    <option key={fp.id} value={fp.id}>
                                        {fp.nome}
                                    </option>
                                ))}
                            </select>
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="flex flex-col mt-1 w-[55%] mr-1">
                        <label className="text-[#635B5B] font-normal text-base mt-4">Recorrência</label>
                            <select value={recorrencia} 
                            onChange={(e) => setRecorrencia(e.target.value)} className="w-full bg-[#E5F1DF]  py-1 px-1 rounded outline-none focus:bg-white focus:border focus:border-[#78BC5F] h-8">
                                <option value="" ></option>
                                <option value="15">Quinzenal</option>
                                <option value="7">Semanal</option>
                                <option value="30">Mensal</option>
                                <option value="365">Anual</option>
                            </select>
                    </div>
                    <div className="flex flex-col mt-5 w-[40%]">
                        <Input
                            nome="Quantidade de Parcelas"
                            type="number"
                            value={quantidadeParcelas}
                            onChange={(e) => setQuantidadeParcelas(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="flex flex-col mt-4 w-[55%] mr-1">
                        <Input
                            nome="Data de Vencimento"
                            type="date"
                            value={dataVencimento}
                            onChange={(e) => setDataVencimento(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col w-[40%]">
                        <label className="text-[#635B5B] font-normal text-base mt-4">Status</label>
                            <select value={status} 
                            onChange={(e) => setStatus(e.target.value)} className="w-full bg-[#E5F1DF]  py-1 px-1 rounded outline-none focus:bg-white focus:border focus:border-[#78BC5F] h-8">
                                <option value="" ></option>
                                <option value="Agendado">Agendado</option>
                                <option value="Pago">Pago</option>
                                <option value="Não Pago">Não Pago</option>
                            </select>
                    </div>
                </div>
                
                <div className="flex flex-row mt-6">
                    <input type="checkbox" className="mr-2" checked={fixo} onChange={(e) => setFixo(e.target.checked)} />
                    <label>É uma despesa fixa</label>
                </div>
                
            <button onClick={Salvar} className="bg-[#78BC5F] text-[#FFFFFF] text-base w-full py-2 rounded mt-6">{ despesa ? "Salvar" : "Cadastrar"}</button>
            </div>
        </div>
    </div>
    )
}