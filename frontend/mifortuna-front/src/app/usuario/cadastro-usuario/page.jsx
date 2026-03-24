"use client"
import Input from "../../components/input"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { cadastrar } from "../../service/authService"

export default function Login(){
    const router = useRouter()
    const [nomeCompleto, setNomeCompleto] = useState("")
    const [dataNascimento, setDataNascimento] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmaSenha, setConfirmaSenha] = useState("")
    const [aceitouTermos, setAceitouTermos] = useState(false)

    async function CadastrarUsuario() {
    if (senha !== confirmaSenha) {
        alert("As senhas não coincidem");
        return;
    }

    if (!aceitouTermos) {
    alert("Você precisa aceitar os termos para se cadastrar");
    return;
    }

    try {
        await cadastrar(nomeCompleto, dataNascimento,email, senha);
        alert("Cadastro realizado com sucesso!");
        router.push("/usuario/login");
    } catch (error) {
        alert("Erro ao cadastrar. Verifique os dados.");
    }
}
    return(
        <div className="flex items-center justify-center min-h-screen py-20">
            <div className="m-10 p-6">
                <img src="/img-login.png" className="w-[400]" alt=""></img>
            </div>
            <div className="m-10 p-6 w-[30%]">
                <img src="/logo-login.png" alt="" className="w-[200] mt-8"/>

                <h3 className="text-[#105F0D] font-bold text-lg mt-6 mb-6">Cadastro</h3>

                <div className="my-2">
                    <Input
                    nome="Nome Completo"
                    type="text"
                    value={nomeCompleto}
                    onChange={(s) => setNomeCompleto(s.target.value)}
                    />
                </div>
                <div className="my-2">
                    <Input 
                    nome="Data de Nascimento"
                    type="date"
                    value={dataNascimento}
                    onChange={(d) => setDataNascimento(d.target.value)}
                    />
                </div>
                <div className="my-2">
                    <Input 
                    nome="Email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="my-2">
                    <Input 
                    nome="Senha"
                    type="password"
                    value={senha} 
                    onChange={(s) => setSenha(s.target.value)}
                    />
                </div>
                <div className="my-2">
                    <Input 
                    nome="Confirmar senha"
                    type="password"
                    value={confirmaSenha} 
                    onChange={(e) => setConfirmaSenha(e.target.value)}
                    />
                </div>
                
                <div className="flex flex-row">
                    <input type="checkbox"
                           checked={aceitouTermos}
                           onChange={(e) => setAceitouTermos(e.target.checked)}
                    />
                    <p className="text-xs  text-[#635B5B] m-2 w-full">Declaro que li e aceito os termo e politicas de serviços</p>
                </div>
               
                <div>
                    <button onClick={() => CadastrarUsuario()} className="bg-[#78BC5F] text-[#FFFFFF] text-base w-full py-1 rounded mt-4 hover:bg-[#44892A]">Cadastrar</button>
                </div>

                <div className="text-center mt-4">
                    <a className="text-green-800 font-normal text-xs hover:underline" href="/usuario/login">
                         Já tem uma conta? Iniciar sessão
                    </a>
                </div>

            </div>
        </div>
    )
}