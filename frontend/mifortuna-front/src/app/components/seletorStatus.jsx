export default function SeletorStatus(){

    const status = ["ativado", "desativado"]
    return(
        <div className="flex flex-col">
            <label className="text-[#635B5B] font-normal text-base mt-3">Status</label>
                <select className="w-32 bg-[#E5F1DF] py-2 rounded outline-none focus:bg-white focus:border focus:border-[#78BC5F]">

                    {status.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
        </div>
    )
    
}