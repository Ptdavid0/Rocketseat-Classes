/* eslint-disable indent */
import express from 'express';
import routes from './routes'; // Requisitando as rotas de outro arquivo
import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json()); // Receber requisicoes no formato Json
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
