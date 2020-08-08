import React from 'react';

import logoImg from '../../assets/images/logo.svg';
import eyeIcon from '../../assets/images/icons/eye.svg';

import './styles.css';

const Register = () => {
  return (
    <section id="page-register">
      <div className="register-form">
        <form>
          <fieldset>
            <legend>Cadastro</legend>
            <p>
              Preencha os dados abaixo
              <br /> para começar.
            </p>

            <div>
              <div className="input-container">
                <div className="field">
                  <input type="text" placeholder="Nome" />
                </div>
                <div className="field">
                  <input type="text" placeholder="Sobrenome" />
                </div>
                <div className="field">
                  <input type="email" placeholder="E-mail" />
                </div>
                <div className="field password-field">
                  <input type="text" placeholder="Senha" />
                  <img src={eyeIcon} alt="Ver senha" />
                </div>
              </div>

              <div className="button-container">
                <button>Concluir cadastro</button>
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
