export default function Input({nome, ...props}){
    return(
        <div>
            <label className="text-[#635B5B] font-normal text-base mt-3">{nome}</label>
            <input className="w-full bg-[#E5F1DF] p-1 py-1 rounded outline-none focus:bg-white focus:border focus:border-[#78BC5F]" {...props} />
        </div>
    )
}