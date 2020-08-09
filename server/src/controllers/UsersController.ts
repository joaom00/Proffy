import { Request, Response } from 'express';
import db from '../database/connection';
import bcrypt from 'bcryptjs';

export default class UsersController {
  async show(req: Request, res: Response) {
    const { id } = req.params;

    const user = await db('users').where({ id: id }).first();

    delete user.password;

    if (!user) {
      return res
        .status(404)
        .json({ message: 'Usuário não encontrado ou não existe.' });
    }

    const classes = await db('classes').where({ user_id: user.id }).first();

    if (!classes) {
      return res.status(200).json({
        user,
      });
    }

    const schedule = await db('class_schedule').where({ class_id: classes.id });

    if (!schedule) {
      return res.status(200).json({
        user,
        classes,
      });
    }

    return res.status(200).json({
      user,
      classes,
      schedule,
    });
  }

  async create(req: Request, res: Response) {
    const { first_name, last_name, email, password } = req.body;

    const emailExists = await db('users').where({ email: email }).first();

    if (emailExists) {
      return res.status(404).json({ message: 'Usuário já existe' });
    }

    const hashPassword = bcrypt.hashSync(password, 8);

    const user = await db('users').insert({
      first_name,
      last_name,
      email,
      password: hashPassword,
    });

    return res.status(200).send({ message: 'Usuário criado com sucesso' });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      email,
      avatar,
      bio,
      whatsapp,
      subject,
      cost,
    } = req.body;

    await db('users')
      .update({ first_name, last_name, email, avatar, bio, whatsapp })
      .where({ id: id });

    await db('classes').update({ subject, cost }).where({ id: id });

    return res.send({
      message: 'Usuário atualizado com sucesso.',
    });
  }
}
