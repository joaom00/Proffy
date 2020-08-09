import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
  const [tokenIsValid, setTokenIsValid] = useState(false);

  useEffect(() => {
    api.get('connections').then(({ data: { total } }) => {
      setTotalConnections(total);
    });
  }, []);

  useEffect(() => {
    const token = window.localStorage.getItem('token');

    if (token) {
      api
        .get('load-session')
        .then(() => {
          setTokenIsValid(true);
        })
        .catch(() => {
          setTokenIsValid(false);
        });
    }
  }, []);

  return (
    <div id="page-landing">
      <section id="top-section">
        <div id="top-container" className="container">
          <LandingHeader />

          <div className="hero-content">
            <motion.div
              initial={{ y: 50, skewY: 15, opacity: 0 }}
              animate={{ y: 0, skewY: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="logo-container"
            >
              <img src={logoImg} alt="Proffy" />
              <h2>Sua plataforma de estudos online.</h2>
            </motion.div>

            <motion.img
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6, stiffness: 1000 }}
              src={landingImg}
              alt="Plataforma de estudos"
              className="hero-image"
            />
          </div>
        </div>
      </section>

      <section id="bottom-section">
        <div id="bottom-container" className="container">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, stiffness: 1000 }}
            className="title-container"
          >
            <p>
              Seja bem-vindo <br />
              <span>O que deseja fazer?</span>
            </p>

            <span className="total-connections">
              Total de {totalConnections} conexões
              <br /> já realizadas{' '}
              <img src={purpleHeartIcon} alt="Coração Roxo" />
               
            </span>
          </motion.div>

          <div className="buttons-container">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <Link to={tokenIsValid ? '/study' : '/login'} className="study">
                <img src={studyIcon} alt="Estudar" />
                Estudar
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <Link
                to={tokenIsValid ? '/give-classes' : '/login'}
                className="give-classes"
              >
                <img src={giveClassesIcon} alt="Dar aulas" />
                Dar aulas
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing2;
