import React from 'react';

import logoutIcon from '../../assets/images/icons/logout.svg';

import './styles.css';

const LandingHeader = () => {
  return (
    <header>
      <div className="profile">
        <img
          src="https://avatars2.githubusercontent.com/u/2254731?s=460&u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&v=4"
          alt="Diego Fernandes"
        />
        <p>Diego Fernandes</p>
      </div>

      <button className="logout-button">
        <img src={logoutIcon} alt="Sair da conta" />
      </button>
    </header>
  );
};

export default LandingHeader;
