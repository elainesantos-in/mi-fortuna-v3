"use client"
import Input from "../../components/input"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { login } from "../../service/authService"


export default function Login(){
    const router = useRouter();
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [carregando, setCarregando] = useState(false)

 async function ValidaLongin(){
        if (carregando) return;

        setCarregando(true);
        try {
            await login(email,senha);
            router.push("/inicio");
        } catch (error){
            alert("Email ou senha inválidos")
        } finally {
            setCarregando(false);
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

                <button
                    onClick={() => ValidaLongin() }
                    disabled={carregando}
                    className="bg-[#78BC5F] text-[#FFFFFF] text-base w-full py-1 rounded mt-6 hover:bg-[#44892A] disabled:bg-[#A9C79B] disabled:cursor-not-allowed"
                >
                    {carregando ? "Entrando..." : "Entrar"}
                </button>

                {carregando && (
                    <p className="text-stone-500 text-xs text-center mt-2">
                        O servidor pode estar acordando — isso leva até 1 minuto na primeira vez.
                    </p>
                )}

                <div className="mt-6 p-3 rounded border border-[#78BC5F] bg-[#F3F9F0] text-center">
                    <p className="text-[#105F0D] font-bold text-xs">Quer só dar uma olhada?</p>
                    <p className="text-stone-600 text-xs mt-1">Email: demo@mifortuna.com</p>
                    <p className="text-stone-600 text-xs">Senha: demo123</p>
                    <button
                        onClick={() => { setEmail("demo@mifortuna.com"); setSenha("demo123"); }}
                        className="text-green-800 font-normal text-xs hover:underline mt-2"
                    >
                        Preencher com a conta demo
                    </button>
                </div>

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