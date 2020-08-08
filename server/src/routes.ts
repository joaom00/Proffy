import express from 'express';

import authMiddleware from './middlewares/authMiddleware';

import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';
import UsersController from './controllers/UsersController';
import AuthController from './controllers/AuthController';

const routes = express.Router();
const classesControllers = new ClassesController();
const connectionsController = new ConnectionsController();
const usersController = new UsersController();
const authController = new AuthController();

routes.get('/users', authMiddleware, usersController.index);
routes.post('/users', usersController.create);

routes.get('/classes', classesControllers.index);
routes.post('/classes', classesControllers.create);

routes.get('/connections', connectionsController.index);
routes.post('/connections', connectionsController.create);

routes.post('/login', authController.authenticate);
routes.get('/load-session', authMiddleware, authController.loadSession);

export default routes;
