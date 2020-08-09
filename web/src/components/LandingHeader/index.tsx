import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import logoutIcon from '../../assets/images/icons/logout.svg';
import api from '../../services/api';

import './styles.css';

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
      <motion.header
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ stiffness: 1000 }}
      >
        <Link to="/profile" className="profile">
          <img src={user?.avatar} alt="" />
          <p>
            {user?.first_name} {user?.last_name}
          </p>
        </Link>

        <button onClick={handleLogout} className="logout-button">
          <img src={logoutIcon} alt="Sair da conta" />
        </button>
      </motion.header>
    );
  } else {
    return <header></header>;
  }
};

export default LandingHeader;
