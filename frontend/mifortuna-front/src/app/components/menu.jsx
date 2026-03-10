"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Menu(){
    const pathname = usePathname()
    if(pathname === "/login" || pathname === "/") return null

    return(
        <div className="flex items-center rounded-br-xl rounded-bl-lx">

            <div className="px-4 py-2 rounded-tr-2xl rounded-br-2xl bg-[#105F0D] ">
                <img src="/logo-mifortuna.png" className="h-10"/>
            </div>

            <ul className="flex gap-6 ">

                <li className="px-6 py-4 hover:bg-[#EEEEEE] hover:rounded-xl">
                    <Link href="/inicio" className=" text-[#635B5B] font-semibold ">Início</Link>
                </li>

                <li className="relative group px-6 py-4 hover:bg-[#EEEEEE] hover:rounded-xl">
                    <button className="text-[#635B5B] font-semibold">Cadastros</button>

                    <ul className="absolute hidden group-hover:block bg-white shadow-md mt-2 p-2 rounded-xl whitespace-nowrap">
                        <li className="px-6 py-3 text-sm hover:bg-gray-100 rounded-lg">
                            <Link href="/cadastros/categorias" className="text-[#635B5B] font-normal">Categorias</Link>
                        </li>
                        <li className="px-6 py-3 text-sm hover:bg-gray-100 rounded-lg">
                            <Link href="/cadastros/receitas" className="text-[#635B5B] font-normal">Receitas/Salários</Link>
                        </li>
                        <li className="px-6 py-3 text-sm hover:bg-gray-100 rounded-lg">
                            <Link href="/cadastros/formas-pagamento" className="text-[#635B5B] font-normal">Formas de Pagamento</Link>
                        </li>
                    </ul>
                </li>

                <li className="px-6 py-4 hover:bg-[#EEEEEE] hover:rounded-xl">
                    <Link href="/despesas" className="text-[#635B5B] font-semibold">Despesas</Link>
                </li>

                <li className="px-6 py-4 hover:bg-[#EEEEEE] hover:rounded-xl">
                    <Link href="/poupanca" className="text-[#635B5B] font-semibold">Poupança</Link>
                </li>

                <li className="relative group px-6 py-4 hover:bg-[#EEEEEE] hover:rounded-xl">
                    <button className="text-[#635B5B] font-semibold">Indicadores</button>

                    <ul className="absolute hidden group-hover:block bg-white shadow-md mt-2 p-2 rounded-xl">
                        <li className="px-6 py-3 text-sm hover:bg-gray-100 rounded-lg">
                            <Link href="/indicadores/graficos" className="text-[#635B5B] font-normal">Gráficos</Link>
                        </li>
                        <li className="px-6 py-3 text-sm hover:bg-gray-100 rounded-lg">
                            <Link href="/indicadores/relatorios" className="text-[#635B5B] font-normal">Relatórios</Link>
                        </li>
                    </ul>
                </li>

            </ul>
            <div className="relative group ml-auto mr-2">
                <button className="px-3 py-3 rounded-full bg-[#E5F1DF]">
                    <img src="/icone-menu-perfil.png"/>
                </button>

                <ul className="absolute right-0 hidden group-hover:block bg-white shadow-md pt-2 rounded-xl p-2 whitespace-nowrap">

                    <li className="px-6 py-3 text-sm hover:bg-gray-100 rounded-lg"><Link href="/perfil" className="text-[#635B5B] font-normal">Meu Perfil</Link></li>
                    <li className="px-6 py-3 text-sm hover:bg-gray-100 rounded-lg"><Link href="/login" className="text-[#635B5B] font-normal">Sair</Link></li>
                </ul>
            </div>
    </div>
    )
}