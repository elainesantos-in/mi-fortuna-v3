export default function SeletorStatus({...props}){
    return(
        <div className="flex flex-col">
            <label className="text-[#635B5B] font-normal text-base mt-3">Status</label>
                <select className="w-32 bg-[#E5F1DF] py-1 px-1 rounded outline-none focus:bg-white focus:border focus:border-[#78BC5F]" {...props}>
                    <option   value="true">ativado</option>
                    <option value="false">desativado</option>
                </select>
        </div>
    )
    
}