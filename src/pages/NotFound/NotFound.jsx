import React from 'react';
import { Link } from 'react-router-dom';
import style from './NotFound.module.css';
import Navbar from '../../components/Navbar/Navbar'; // Adjust the path as necessary

const NotFound = () => {
    return (
        <>
      <Navbar/>
        <div className={style.text}>
            <h1>404</h1>
            <h2>Página não encontrada</h2>
            <p>Desculpe, a página que você está procurando não existe.</p>
            <Link to="/" className="btn btn-primary">Voltar para a página inicial</Link>
        </div>

        <footer className={style.footer}>
          <p>&copy; {new Date().getFullYear()} Tech Tooth. Todos os direitos reservados.</p>
          <div className={style.footerLinks}>
            {/* <a href="/termos" className="text-decoration-none text-primary">Termos de Serviço</a>
            <a href="/privacidade" className="text-decoration-none text-primary">Política de Privacidade</a> */}
          </div>
      </footer>
    </>
    );
};

export default NotFound;