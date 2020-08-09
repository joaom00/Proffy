import React, { useState, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import eyeIcon from '../../assets/images/icons/eye.svg';
import eyeOffIcon from '../../assets/images/icons/eye-off.svg';
import heartIcon from '../../assets/images/icons/purple-heart.svg';

import './styles.css';
import api from '../../services/api';

const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function handleLogin(event: FormEvent) {
    event.preventDefault();

    api
      .post('login', {
        email,
        password,
      })
      .then(({ data: { token } }) => {
        window.localStorage.setItem('token', token);
        history.push('/');
      })
      .catch(() => {
        alert('Algo deu errado. Por favor tente novamente.');
      });
  }

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
        <form onSubmit={handleLogin}>
          <fieldset>
            <legend>Fazer login</legend>

            <div>
              <div className="input-container">
                <div className="email-field">
                  <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="password-field">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Senha"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <img
                    onClick={() => setShowPassword((prevState) => !prevState)}
                    src={showPassword ? eyeOffIcon : eyeIcon}
                    alt="Ver senha"
                  />
                </div>
              </div>

              <div className="password">
                <div className="password-remember">
                  <input id="check" type="checkbox" />
                  <label htmlFor="check">Lembrar-me</label>
                </div>

                <div className="password-forgot">
                  <Link to="/forgot-password">Esqueci minha senha</Link>
                </div>
              </div>

              <div className="button-container">
                <button type="submit">Entrar</button>
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
