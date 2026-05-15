export default function Input({nome,erro, ...props}){
    return(
        <div>
            <label className="text-[#635B5B] font-normal text-base mt-3">{nome}</label>
            <input className={`w-full bg-[#E5F1DF] h-10 p-1 px-2 py-1 rounded outline-none focus:bg-white focus:border focus:border-[#78BC5F] text-[#635B5B] ${erro ? "border-2 border-red-500" : ""}`} {...props} />
        </div>
    )
}