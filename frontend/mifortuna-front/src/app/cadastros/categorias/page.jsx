"use client"
import SeletorStatus from "@/app/components/seletorStatus"
import Input from "../../components/input"
import BotaoPesquisar from "@/app/components/botaoPesquisar"
import BotaoCriarNovo from "@/app/components/botaoCriarNovo"
import CriarCategorias from "./modalCriarCategoria/criarCategoria"
import { useState, useEffect } from "react"
import { listarCategorias } from "../../service/categoriaService"

export default function Categorias(){

    const [modalAberto, setModalAberto] = useState(false)
    const [categorias, setCategorias] = useState([])
    const [status, setStatus] = useState("true")
    const [nome, setNome] = useState("")
    const [categoriaEditando, setCategoriaEditando] = useState(null)

    async function buscarCategorias(status,nome){
        if(status !== undefined){
            const dados = await listarCategorias(status,nome)
            setCategorias(dados)
        }
    }

    useEffect(() => {
        buscarCategorias(status,nome)
    }, [])

    let totalLimiteGastos = categorias.reduce((total,categ)=> total + Number(categ.limiteGasto),0)


    return(
        <div className="h-[calc(100vh-72px)] flex flex-col bg-[#F0FFF0] pt-10 text-[#635B5B]">
            <div className="w-[80%] mx-auto flex-1 bg-white rounded-t-2xl pt-4 flex flex-col overflow-hidden">
                <h1 className="flex justify-center text-xl font-semibold p-4">Categorias</h1>
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
                            onClick={() => buscarCategorias(status,nome)}
                        />
                    </div>
                    <BotaoCriarNovo onClick={()=>setModalAberto(true)}/>
                </div>
                <div className="flex flex-row w-[85%] items-start mx-auto mt-8 px-2 ">
                    <div className="flex-1">Categorias</div>
                    <div className="flex-1"></div>
                    <div className="flex-1 text-center">Limite de Gastos</div>
                    <div className="flex-1"></div>
                </div>

                <div className="flex flex-col justify-start pb-14 flex-1 overflow-y-auto">
                    {categorias.map((categ) =>(  
                        <div key={categ.id} className={`flex flex-row w-[85%] items-start mx-auto rounded px-2 py-1 mt-2 ${categ.ativo ? 'bg-[#E4FDE3]' : 'bg-[#EEEEEE]'}`}>

                            <div className="flex-1">{categ.nome}</div>
                            <div className="flex-1 mr-2"></div>
                            <div className="flex-1 text-center">{categ.limiteGasto}</div>
                            <div className="flex-1 w-2"></div>
                            <button className="ml-auto" onClick={()=> {setCategoriaEditando(categ), setModalAberto(true)}}>
                                <img src="/Editar-icon.svg" alt="" />
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex flex-row bg-[#105F0D] h-12 px-4 py-3 rounded-tl-2xl rounded-tr-2xl justify-between fixed bottom-0 w-[80%] left-1/2 -translate-x-1/2">
                    <div className="text-white font-semibold text-lg">Total limite de gastos</div>
                    <div className="text-white font-semibold text-lg">{totalLimiteGastos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                </div>
            </div>
            <div className="flex justify-center">
                {modalAberto &&<CriarCategorias 
                    fechar={() => {setModalAberto(false);setCategoriaEditando(null);}}
                    atualizar={() => buscarCategorias(status)} 
                    categoria={categoriaEditando}
                />}
            </div>
       
        </div>
    )
}