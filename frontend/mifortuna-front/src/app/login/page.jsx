"use client"
import Input from "../components/input"
import { useRouter } from "next/navigation"

export default function Login(){
    const router = useRouter()

    return(
        <div className="flex justify-center min-h-screen">
            <div className="m-10 p-6">
                <img src="/img-login.png" className="w-[400] pt-6" alt=""></img>
            </div>
            <div className="m-20 p-6">
                <img src="/logo-login.png" alt="" className="w-[200] mt-8"/>

                <h3 className="text-[#105F0D] font-bold text-lg mt-6">Login</h3>

                <div className="text-[#635B5B] font-normal text-xs mt-8">Email</div>
                <Input />

                <div className="text-[#635B5B] font-normal text-xs mt-3">Senha</div>
                <Input />

                <button onClick={() => router.push("/inicio")} className="bg-[#78BC5F] text-[#FFFFFF] text-base w-full py-1 rounded mt-6">Entrar</button>
                
                <p className="w-full text-center text-stone-500 text-xs  mt-6">
                    Esqueceu a senha?  
                    <a className="text-green-800 font-normal text-xs hover:underline" href=""> Clique aqui</a>
                </p>
                <p className="text-center">
                    <a className="text-green-800 font-normal text-xs" href="">
                        Não tem cadastro? Inscreva-se!
                    </a>
                </p>
            </div>
        </div>
    )
}