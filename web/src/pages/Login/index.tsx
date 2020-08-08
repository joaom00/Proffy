import React from 'react';

import logoImg from '../../assets/images/logo.svg';
import eyeIcon from '../../assets/images/icons/eye.svg';
import heartIcon from '../../assets/images/icons/purple-heart.svg';

import './styles.css';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <section id="page-login">
      <div className="hero-content">
        <div className="bg-image">
          <div>
            <img src={logoImg} alt="Proffy" />
            <h2>
              Sua plataforma de
              <br /> estudos online.
            </h2>
          </div>
        </div>
      </div>

      <div className="login-form">
        <form>
          <fieldset>
            <legend>Fazer login</legend>

            <div>
              <div className="input-container">
                <div className="email-field">
                  <input type="email" placeholder="E-mail" />
                </div>
                <div className="password-field">
                  <input type="text" placeholder="Senha" />
                  <img src={eyeIcon} alt="Ver senha" />
                </div>
              </div>

              <div className="password">
                <div className="password-remember">
                  <input id="check" type="checkbox" />
                  <label htmlFor="check">Lembrar-me</label>
                </div>

                <div className="password-forgot">
                  <a href="https://google.com">Esqueci minha senha</a>
                </div>
              </div>

              <div className="button-container">
                <button>Entrar</button>
              </div>
            </div>

            <div className="links-container">
              <div className="register-link">
                <p>Não tem conta?</p>
                <Link to="/register">Cadastre-se</Link>
              </div>

              <div className="text-right">
                <p>
                  É de graça
                  <img src={heartIcon} alt="Coração" />
                </p>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </section>
  );
};

export default Login;
