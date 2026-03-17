"use client"
import SeletorStatus from "@/app/components/seletorStatus"
import Input from "../../components/input"
import BotaoPesquisar from "@/app/components/botaoPesquisar"
import BotaoCriarNovo from "@/app/components/botaoCriarNovo"
import CriarCategorias from "./modalCriarCategoria/criarCategoria"
import { useState, useEffect } from "react"
import { listarCategorias } from "../../service/categoriaService"

export default function Categorias(){
    const [categorias, setCategorias] = useState([])

    async function buscarCategorias(){
        const dados = await listarCategorias()
        setCategorias(dados)
    }

    useEffect(() => {
        buscarCategorias()
    }, [])

    const [modalAberto, setModalAberto] = useState(false)
    return(
        <div className="h-[calc(100vh-72px)] flex flex-col bg-[#F0FFF0] pt-10 text-[#635B5B]">
            <div className="w-[80%] mx-auto flex-1 bg-white rounded-t-2xl pt-6 flex flex-col overflow-hidden">
                <h1 className="flex justify-center font-semibold text-2xl p-6">Categorias</h1>
                <div className="flex flex-row items-end w-[85%] mx-auto">
                    <div className="flex flex-row items-end gap-2">
                        <SeletorStatus/>
                        <Input
                            nome="Pesquisar"
                            type="text"
                            value=""
                        />
                        <BotaoPesquisar/>
                    </div>
                    <BotaoCriarNovo onClick={()=>setModalAberto(true)}/>
                </div>
                <div className="flex flex-col justify-center mt-8 pb-16 max-h-50 overflow-y-auto">
                    <div className="flex flex-row w-[85%] items-start mx-auto mt-8 ">
                        <div className="w-40">Categorias</div>
                        <div className="w-40 mr-2"></div>
                        <div className="w-40 text-right">Limite de Gastos</div>
                        <div className="w-2"></div>
                    </div>

                    {categorias.map((categ) =>(  
                        <div key={categ.id} className="flex flex-row w-[85%] items-start mx-auto bg-[#E4FDE3] rounded p-2 mt-2">
                            <div className="w-40">{categ.nome}</div>
                            <div className="w-40 mr-2"></div>
                            <div className="w-40 text-center">{categ.limiteGasto}</div>
                            <div className="w-2"></div>
                            <button className="ml-auto">
                                <img src="/Editar-icon.svg" alt="" />
                            </button>
                        </div>
                    ))}

                </div>
                <div className="flex flex-row bg-[#105F0D] p-5 rounded-tl-2xl rounded-tr-2xl justify-between fixed bottom-0 w-[80%] left-1/2 -translate-x-1/2">
                    <div className="text-white font-semibold text-2xl">Total limite de gastos</div>
                    <div className="text-white font-semibold text-2xl">R$1500,00</div>
                </div>
            </div>
            <div className="flex justify-center">
                 {modalAberto && <CriarCategorias fechar={() => setModalAberto(false)} atualizar={buscarCategorias} />}
            </div>
       
        </div>
    )
}