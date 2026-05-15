import { TrashIcon } from "lucide-react";

export default function BotaoExcluir({disabled, ...props}){
    return(
        <div>
            <button className={`rounded-md bg-[#78BC5F] mt-2 ml-2 py-1 px-1 ${disabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`} disabled={disabled} {...props}>
                <TrashIcon className={`text-white {disabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`} />
            </button>
        </div>
    )
}