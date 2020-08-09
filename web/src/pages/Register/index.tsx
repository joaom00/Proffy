import React, { useState, FormEvent } from 'react';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';
import eyeIcon from '../../assets/images/icons/eye.svg';
import eyeOffIcon from '../../assets/images/icons/eye-off.svg';

import './styles.css';
import api from '../../services/api';
import { useHistory, Link } from 'react-router-dom';

const Register = () => {
  const history = useHistory();

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function handleCreateUser(event: FormEvent) {
    event.preventDefault();

    api
      .post('users', {
        first_name,
        last_name,
        email,
        password,
      })
      .then(() => {
        alert('Cadastro realizado com sucesso!');
        history.push('/');
      })
      .catch((err) => {
        alert('Erro no cadastro.');
      });
  }

  return (
    <section id="page-register">
      <div className="register-form">
        <Link to="/login">
          <img src={backIcon} alt="Voltar" />
        </Link>
        <form onSubmit={handleCreateUser}>
          <fieldset>
            <legend>Cadastro</legend>
            <p>
              Preencha os dados abaixo
              <br /> para começar.
            </p>

            <div>
              <div className="input-container">
                <div className="field">
                  <input
                    type="text"
                    placeholder="Nome"
                    value={first_name}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </div>
                <div className="field">
                  <input
                    type="text"
                    placeholder="Sobrenome"
                    value={last_name}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </div>
                <div className="field">
                  <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="field password-field">
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

              <div className="button-container">
                <button type="submit">Concluir cadastro</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>

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
    </section>
  );
};

export default Register;
