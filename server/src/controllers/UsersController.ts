import { Request, Response } from 'express';
import db from '../database/connection';
import bcrypt from 'bcryptjs';

export default class UsersController {
  async create(req: Request, res: Response) {
    const { first_name, last_name, email, password } = req.body;

    const emailExists = await db('users').where({ email: email }).first();

    if (emailExists) {
      return res.status(404).send({ message: 'Usuário já existe' });
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
}
