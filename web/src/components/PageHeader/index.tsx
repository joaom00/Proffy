import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <motion.img
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
            src={backIcon}
            alt="Voltar"
          />
        </Link>
        <motion.img
          src={logoImg}
          alt="Proffy"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        />
      </div>

      <div className="header-content">
        <motion.strong
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {title}
        </motion.strong>
        {description && (
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {description}
          </motion.p>
        )}

        {children}
      </div>
    </header>
  );
};

export default PageHeader;
