import React from 'react';
import { motion } from 'framer-motion';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';
import api from '../../services/api';

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.3,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  function createNewConnection() {
    api.post('connections', {
      user_id: teacher.id,
    });
  }

  return (
    <motion.div variants={container} initial="hidden" animate="visible">
      <motion.article variants={item} className="teacher-item">
        <header>
          <img src={teacher.avatar} alt={teacher.name} />
          <div>
            <strong>{teacher.name}</strong>
            <span>{teacher.subject}</span>
          </div>
        </header>

        <p>{teacher.bio}</p>

        <footer>
          <p>
            Preço/hora
            <strong>R$ {teacher.cost}</strong>
          </p>
          <motion.a
            href={`https://wa.me/${teacher.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={createNewConnection}
          >
            <img src={whatsappIcon} alt="Whatsapp" />
            Entrar em contato
          </motion.a>
        </footer>
      </motion.article>
    </motion.div>
  );
};

export default TeacherItem;
