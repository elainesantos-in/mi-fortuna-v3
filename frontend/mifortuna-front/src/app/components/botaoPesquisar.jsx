import { SearchIcon } from "lucide-react";

export default function BotaoPesquisar({...props}){
    return(
        <div>
            <button className=" rounded-md bg-[#78BC5F] py-1 px-1"  {...props}><SearchIcon className="text-white" /></button>
        </div>
    )
    
}