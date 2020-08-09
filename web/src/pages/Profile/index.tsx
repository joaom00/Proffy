import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import warningIcon from '../../assets/images/icons/warning.svg';

import api from '../../services/api';

import './styles.css';

interface ScheduleItem {
  id: number;
  week_day: number;
  from: number;
  to: number;
}

const Profile = () => {
  const [userId, setUserId] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([
    // { week_day: 0, from: '', to: '' },
  ]);

  function addNewScheduleItem() {
    // setScheduleItems([
    //   ...scheduleItems,
    //   {
    //     week_day: 0,
    //     from: '',
    //     to: '',
    //   },
    // ]);
  }

  // function setScheduleItemValue(
  //   position: number,
  //   field: string,
  //   value: string
  // ) {
  //   const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
  //     if (index === position) {
  //       return { ...scheduleItem, [field]: value };
  //     }

  //     return scheduleItem;
  //   });

  //   setScheduleItems(updatedScheduleItems);
  // }

  function handleUpdateUser(event: FormEvent) {
    event.preventDefault();

    api
      .put(`users/${userId}`, {
        first_name,
        last_name,
        email,
        avatar,
        whatsapp,
        bio,
        subject,
        cost,
      })
      .then(() => {
        alert('Usuário atualizado com sucesso.');
      })
      .catch(() => {
        alert('Parece que algo deu errado. Por favor tente novamente.');
      });
  }

  useEffect(() => {
    api.get('load-session').then((response) => {
      setUserId(response.data.user.id);
    });
  }, []);

  useEffect(() => {
    api.get(`users/${userId}`).then((response) => {
      setFirstName(response.data.user.first_name);
      setLastName(response.data.user.last_name);
      setEmail(response.data.user.email);
      setAvatar(response.data.user.avatar);
      setWhatsapp(response.data.user.whatsapp);
      setBio(response.data.user.bio);

      setSubject(response.data.classes.subject);
      setCost(response.data.classes.cost);

      setScheduleItems(response.data.schedule);
    });
  }, [userId]);

  return (
    <div id="page-profile" className="container">
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
          <motion.p
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Meu perfil
          </motion.p>
          <motion.img
            src={logoImg}
            alt="Proffy"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
          />
        </div>

        <div className="header-content">
          {avatar ? (
            <motion.img
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              src={avatar}
              alt=""
            />
          ) : (
            <motion.div
              className="photo-user"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            ></motion.div>
          )}
          <motion.strong
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            {first_name} {last_name}
          </motion.strong>

          <motion.p
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            {subject}
          </motion.p>
        </div>
      </header>
      <motion.main
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <form>
          <fieldset>
            <legend>Seus dados</legend>

            <div className="input-container">
              <Input
                name="name"
                label="Nome"
                value={first_name}
                onChange={(event) => setFirstName(event.target.value)}
              />
              <Input
                name="name"
                label="Sobrenome"
                value={last_name}
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>

            <Input
              name="avatar"
              label="Avatar"
              value={avatar || ''}
              onChange={(event) => setAvatar(event.target.value)}
            />
            <div className="input-container">
              <Input
                name="whatsapp"
                label="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Input
                name="whatsapp"
                label="Whatsapp"
                value={whatsapp || ''}
                onChange={(event) => setWhatsapp(event.target.value)}
              />
            </div>

            <Textarea
              name="bio"
              label="Biografia"
              value={bio || ''}
              onChange={(event) => setBio(event.target.value)}
            />
          </fieldset>

          <fieldset className="about-classes">
            <legend>Sobre a aula</legend>
            <div className="input-container">
              <Select
                name="subject"
                label="Matéria"
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                options={[
                  { value: 'Artes', label: 'Artes' },
                  { value: 'Biologia', label: 'Biologia' },
                  { value: 'Ciências', label: 'Ciências' },
                  { value: 'Educação física', label: 'Educação física' },
                  { value: 'Geografia', label: 'Geografia' },
                  { value: 'História', label: 'História' },
                  { value: 'Matemática', label: 'Matemática' },
                  { value: 'Português', label: 'Português' },
                  { value: 'Química', label: 'Química' },
                ]}
              />
              <Input
                name="cost"
                label="Custo da sua hora por aula"
                value={cost}
                onChange={(event) => setCost(event.target.value)}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem) => {
              return (
                <motion.div
                  className="schedule-container"
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  key={scheduleItem.id}
                >
                  <motion.div className="schedule-item">
                    <Select
                      name="week_day"
                      label="Dia da semana"
                      disabled
                      value={scheduleItem.week_day}
                      options={[
                        { value: '0', label: 'Domingo' },
                        { value: '1', label: 'Segunda-feira' },
                        { value: '2', label: 'Terça-feira' },
                        { value: '3', label: 'Quarta-feira' },
                        { value: '4', label: 'Quinta-feira' },
                        { value: '5', label: 'Sexta-feira' },
                        { value: '6', label: 'Sábado' },
                      ]}
                    />
                    <Input
                      name="from"
                      label="Das"
                      type="text"
                      disabled
                      value={`${scheduleItem.from / 60} horas`}
                    />
                    <Input
                      name="to"
                      label="Até"
                      type="text"
                      disabled
                      value={`${scheduleItem.to / 60} horas`}
                    />
                  </motion.div>
                  <button className="delete-item">Excluir</button>
                </motion.div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button onClick={handleUpdateUser} type="submit">
              Salvar cadastro
            </button>
          </footer>
        </form>
      </motion.main>
    </div>
  );
};

export default Profile;
