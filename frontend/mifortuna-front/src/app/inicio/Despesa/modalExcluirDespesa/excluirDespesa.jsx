"use client"
import {X} from "lucide-react"
import { excluirDespesa } from "@/app/service/despesaService";

export default function ExcluirDespesa({fechar, ids, atualizar}){

    async function excluir(){
    for (const id of ids) {
        await excluirDespesa(id)
    }
    atualizar()
    fechar()
}


    return(
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white w-[35%] shadow-2xl  rounded-2xl p-6">
                <div className="flex justify-end">
                    <button className="flex items-end"  onClick={fechar}><X/></button>
                </div>
                <div className="flex justify-center">
                    <h2 className="font-semibold">Excluir</h2>
                </div>
                <div className="text-center p-6">
                    {ids.length > 1 
                        ? "Tem certeza que deseja excluir as despesas selecionadas?"
                        : "Tem certeza que deseja excluir a despesa selecionada?"
                    }
                </div>
                <div className="flex flex-row justify-center p-2">
                    <button onClick={fechar} className="w-[30%] bg-[#FFFFFF] border  border-[#78BC5F] text-[#78BC5F]  m-2 rounded-md h-8">Não</button>
                    <button onClick={excluir} className="w-[30%] bg-[#78BC5F] h-8 rounded-md text-[#FFFFFF] m-2">Sim</button>
                </div>
            </div>
        </div>
    );
}