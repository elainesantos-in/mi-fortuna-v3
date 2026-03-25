import { TrashIcon } from "lucide-react";

export default function BotaoExcluir({...props}){
    return(
        <div>
            <button className=" rounded-md bg-[#78BC5F] mt-2 ml-2 py-1 px-1"  {...props}><TrashIcon className="text-white" /></button>
        </div>
    )
    
}