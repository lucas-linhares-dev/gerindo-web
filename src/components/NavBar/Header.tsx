
import { Link } from 'react-router-dom';

import "../NavBar/header.css"

export function Header(){

    const usuario = localStorage.getItem('usuarioLogado')
    
    return(
        <div>
            <header>
                <h1>Vende+</h1>
                <nav>
                    <ul>
                        { usuario && <li><Link to="/venda">Vendas</Link></li>}
                        { usuario && <li><Link to="/entrada">Entradas</Link></li>}
                        { usuario && <li><Link to="/formaPagamento">Formas Pag</Link></li>}
                        { usuario && <li><Link to="/cliente">Clientes</Link></li>}
                        { usuario && <li><Link to="/fornecedor">Fornecedores</Link></li>}
                        { usuario && <li><Link to="/produto">Produtos</Link></li>}
                        { usuario && <li><Link to="/categoria">Categorias</Link></li>}
                        { !usuario && <li><Link to="/">Home</Link></li>}
                        { !usuario && <li><Link to="/cadastro">Cadastre-se</Link></li>}
                        { !usuario && <li><Link to="/login">Entrar</Link></li>}
                        { usuario && <li><Link to="/conta">Conta</Link></li>}
                        { usuario && <li><Link to="/sair">Sair</Link></li>}
                    </ul>
                </nav>
            </header>
        </div>
    )
}
