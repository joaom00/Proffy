import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import logoutIcon from '../../assets/images/icons/logout.svg';

import './styles.css';
import api from '../../services/api';

interface User {
  first_name: string;
  last_name: string;
  avatar: string;
}

const LandingHeader = () => {
  const [user, setUser] = useState<User>();
  const [tokenIsValid, setTokenIsValid] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem('token');

    if (token) {
      api
        .get('load-session')
        .then((response) => {
          setUser(response.data.user);
          setTokenIsValid(true);
        })
        .catch(() => {
          setTokenIsValid(false);
        });
    }
  }, [tokenIsValid]);

  function handleLogout() {
    window.localStorage.removeItem('token');
    setUser(undefined);
    setTokenIsValid(false);
    document.location.reload();
  }

  if (tokenIsValid) {
    return (
      <header>
        <Link to="/profile" className="profile">
          <img src={user?.avatar} alt="" />
          <p>
            {user?.first_name} {user?.last_name}
          </p>
        </Link>

        <button onClick={handleLogout} className="logout-button">
          <img src={logoutIcon} alt="Sair da conta" />
        </button>
      </header>
    );
  } else {
    return <header></header>;
  }
};

export default LandingHeader;
