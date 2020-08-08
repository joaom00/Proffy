import React from 'react';

import logoImg from '../../assets/images/logo.svg';

import './styles.css';

const ForgotPassword = () => {
  return (
    <section id="page-forgot">
      <div className="forgot-form">
        <form>
          <fieldset>
            <legend>Eita, esqueceu sua senha?</legend>
            <p>Não esquenta, vamos dar um jeito nisso.</p>

            <div>
              <div className="input-container">
                <div className="field">
                  <input type="email" placeholder="Email" />
                </div>
              </div>

              <div className="button-container">
                <button>Enviar</button>
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

export default ForgotPassword;
