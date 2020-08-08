import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import api from '../../services/api';

import './styles.css';
import LandingHeader from '../../components/LandingHeader';

const Landing2 = () => {
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get('connections').then(({ data: { total } }) => {
      setTotalConnections(total);
    });
  }, []);

  return (
    <div id="page-landing">
      <section id="top-section">
        <div id="top-container" className="container">
          <LandingHeader />

          <div className="hero-content">
            <div className="logo-container">
              <img src={logoImg} alt="Proffy" />
              <h2>Sua plataforma de estudos online.</h2>
            </div>

            <img
              src={landingImg}
              alt="Plataforma de estudos"
              className="hero-image"
            />
          </div>
        </div>
      </section>

      <section id="bottom-section">
        <div id="bottom-container" className="container">
          <div className="title-container">
            <p>
              Seja bem-vindo <br />
              <span>O que deseja fazer?</span>
            </p>

            <span className="total-connections">
              Total de {totalConnections} conexões
              <br /> já realizadas{' '}
              <img src={purpleHeartIcon} alt="Coração Roxo" />
               
            </span>
          </div>

          <div className="buttons-container">
            <Link to="/study" className="study">
              <img src={studyIcon} alt="Estudar" />
              Estudar
            </Link>

            <Link to="/give-classes" className="give-classes">
              <img src={giveClassesIcon} alt="Dar aulas" />
              Dar aulas
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing2;
