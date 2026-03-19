import { PlusIcon } from "lucide-react";

export default function BotaoCriarNovo({onClick}){
    return(
        <div className="ml-auto">
            <button onClick={onClick} className="flex items-center gap-2 px-6 py-1 rounded-md bg-[#78BC5F] text-white hover:bg-[#69a955] transition">
                Criar Novo
                <PlusIcon className="w-5 h-5 text-white"/>
            </button>
        </div>
    ) 
}