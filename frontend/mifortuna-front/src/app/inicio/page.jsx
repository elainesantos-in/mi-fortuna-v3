import { ChevronLeft, ChevronRight } from "lucide-react";
import BotaoPesquisar from "@/app/components/botaoPesquisar"
import BotaoCriarNovo from "@/app/components/botaoCriarNovo"
import BotaoExcluir from "../components/botaoExcluir";

export default function Inicio() {
    // const [modalAberto, setModalAberto] = useState(false)
    // const [status, setStatus] = useState("true")
    // const [nome, setNome] = useState("")
    return (
        <div className="min-h-screen bg-[#F0FFF0] text-[#635B5B] mb-">
            <div className="flex flex-row h-screen justify-between mt-8">
                <div className="w-60 h-screen bg-[#ffffff] rounded-tr-2xl shadow-sm">

                </div>
                <div role="tablist" className="w-200 h-screen bg-[#ffffff] rounded-t-2xl shadow-sm">
                    <div className="flex flex-row">
                        <button role="tab" aria-selected="true" className= "w-100 rounded-lg py-2">Visão Geral</button>
                        <button role="tab" aria-selected="true"className="w-100 rounded-lg bg-[#E5F1DF] py-2">Despesas</button>    
                    </div>
                    <div className="flex flex-row items-center justify-center p-2 mt-6">
                        <button className="p-1 rounded-md hover:bg-[#EEEEEE]"><ChevronLeft size={20} /></button>

                        <div className="w-50 flex items-center justify-center h-8 text-sm rounded-md">Janeiro</div>

                        <div className="w-50 bg-[#78BC5F] flex items-center justify-center h-8 text-sm text-white rounded-md">Fevereiro</div>

                        <div className="w-50 flex items-center justify-center h-8 text-sm rounded-md">Março</div>

                        <button className="p-1 rounded-md hover:bg-[#EEEEEE]"><ChevronRight size={20} /></button>
                    </div>
                    <div className="flex flex-row items-end w-[85%] mx-auto">
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
                            // onClick={()=>setModalAberto(true)}
                        />
                        <BotaoExcluir/>
                    </div>
                    <div className="flex flex-col justify-center ml-8">
                        <div className="flex flex-row w-[90%] items-star mt-8 ml-6 px-2 text-sm ">
                            <div className="flex-1">Categorias</div>
                            <div className="flex-1">Nome</div>
                            <div className="flex-1 text-center">Data Venc</div>
                            <div className="flex-1">For.Pag</div>
                            <div className="flex-1">Status</div>
                        </div>

                        <div className="flex flex-row flex-1 overflow-y-auto">
                            <input type="checkbox" className="m-2" /> 
                            <div className="flex flex-row w-[90%] items-center mx-2 rounded px-2 py-1.5 my-4 bg-[#E4FDE3]">
                                <div className="flex-1">categoria</div>
                                <div className="flex-1 mr-2">nome</div>
                                <div className="flex-1 text-center">25/03/2026</div>
                                <div className="flex-1 w-2">nubanck</div>
                                <div className="flex-1 w-2">pago</div>
                                <button className="ml-auto">
                                    <img src="/Editar-icon.svg" alt="" />
                                </button>
                            </div>
                        </div>
                    </div> 
                </div>
                <div className="w-60 h-screen bg-[#ffffff] rounded-tl-2xl shadow-sm">

                </div>
            </div>
        </div>
    )
}
