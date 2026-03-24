"use client"
import Input from "../../components/input"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { login } from "../../service/authService"


export default function Login(){
    const router = useRouter();
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

 async function ValidaLongin(){
        try {
            await login(email,senha);
            router.push("/inicio");
        } catch (error){
            alert("Email ou senha inválidos")
        }
    }

    return(
        <div className="flex flex-row items-center justify-center min-h-screen py-20">
            <div className="m-10 p-6">
                <img src="/img-login.png" className="w-[400]" alt=""></img>
            </div>
            <div className="m-10 p-6">
                <img src="/logo-login.png" alt="" className="w-[200] mt-8"/>

                <h3 className="text-[#105F0D] font-bold text-lg mt-6 mb-6">Login</h3>

                <Input
                    nome="Email"
                    type="text"
                    value={email}
                    onChange={(n) => setEmail(n.target.value)}
                />
                <Input 
                    nome="Senha"
                    type="password"
                    value={senha}
                    onChange={(n) => setSenha(n.target.value)}
                />

                <button onClick={() => ValidaLongin() } className="bg-[#78BC5F] text-[#FFFFFF] text-base w-full py-1 rounded mt-6 hover:bg-[#44892A]">Entrar</button>
                
                <p className="w-full text-center text-stone-500 text-xs  mt-6">
                    Esqueceu a senha?  
                    <a className="text-green-800 font-normal text-xs hover:underline" href=""> Clique aqui</a>
                </p>
                <p className="text-center">
                    <a className="text-green-800 font-normal text-xs hover:underline" href="/usuario/cadastro-usuario">
                        Não tem cadastro? Inscreva-se!
                    </a>
                </p>
            </div>
        </div>
    )
}