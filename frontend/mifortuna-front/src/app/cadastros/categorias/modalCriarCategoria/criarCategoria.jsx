"use client"
import {X} from "lucide-react"
import Input from "../../../components/input"

export default function CriarCategorias({fechar}){
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
                        value=""
                    />
                </div>
                <div className="mt-6">
                    <Input
                        nome="Limite de Gastos"
                        type="number"
                        value=""
                    />
                </div>
                <div className="flex flex-row mt-6">
                    <input type="checkbox" className="mr-2" />
                    <label>Ativado</label>
                </div>
                
            <button className="bg-[#78BC5F] text-[#FFFFFF] text-base w-full py-2 rounded mt-6">Cadastrar</button>
            </div>
        </div>
    </div>
    )
}