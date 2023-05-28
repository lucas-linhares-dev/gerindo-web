import { Routes } from "react-router"
import { BrowserRouter, Route } from "react-router-dom"
import { Cadastro } from "../pages/Cadastro/Cadastro"
import { Categoria } from "../pages/Categoria/Categoria"
import { Login } from "../pages/Login/Login"
import { PaginaInicial } from "../pages/paginaInicial/PaginaInicial"
import { Produto } from "../pages/Produto/Produto"
import { Fornecedor } from "../pages/Fornecedor/Fornecedor"
import { Cliente } from "../pages/Cliente/Cliente"
import { FormaPagamento } from "../pages/FormaPagamento/FormaPagamento"
import { Entrada } from "../pages/Entrada/EntradaForm"
import { Venda } from "../pages/Venda/Venda"
import Navbar from "../components/NavBar/Navbar"
import { ConfigurarUsuario } from "../pages/Usuario/ConfigurarUsuario"

export const AppRoutes = () => {

    const usuario = localStorage.getItem('usuarioLogado')


    return(
        <BrowserRouter>
            { usuario && <Navbar />}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/configurar_usuario" element={<ConfigurarUsuario />} />
                <Route path="/pagina_inicial" element={<PaginaInicial />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/categoria" element={<Categoria />} />
                <Route path="/produto" element={<Produto />} />
                <Route path="/fornecedor" element={<Fornecedor />} />
                <Route path="/cliente" element={<Cliente />} />
                <Route path="/formaPagamento" element={<FormaPagamento />} />
                <Route path="/entrada" element={<Entrada />} />
                <Route path="/venda" element={<Venda />} />
                <Route path="/sair" element={<Sair />}/>
            </Routes>
        </BrowserRouter>
    )
}

export const Sair = () => {
    localStorage.removeItem('usuarioLogado')
    window.location.href = 'http://localhost:3000'
    return null
}