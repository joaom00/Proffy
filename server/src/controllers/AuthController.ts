import { Request, Response } from 'express';
import db from '../database/connection';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default class AuthController {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await db('users').where({ email: email }).first();

    if (!user) {
      return res.status(401).send({ message: 'Usuário não encontrado.' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).send({ message: 'Senha incorreta.' });
    }

    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d' });

    delete user.password;

    return res.status(200).send({
      user,
      token,
    });
  }

  async loadSession(req: Request, res: Response) {
    const user = await db('users').where({ id: req.userId }).first();

    if (!user) {
      return res
        .status(401)
        .send({ message: 'Sua sessão está inválida ou expirada' });
    }

    delete user.password;

    return res.status(200).send({
      user,
    });
  }
}
