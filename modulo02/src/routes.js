import { Router } from 'express'; // importa apenas a parte de routes do express, e nao ele todo.
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware); // Uso global para rotas a baixo do statement

routes.put('/users', UserController.update);

export default routes;
