import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

import './database';

const app = express();
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

// verifica se o erro foi gerado pela nossa aplicaçao, e assim devolver uma tratativa amigavel ao front-end
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // se o erro não for um gerado pela nossa classe AppError(da aplicação) sera erro externo e retornará
  return response.status(500).json({
    status: 'erro',
    message: 'Erro Interno do Servidor',
  });
});

app.listen(3333, () => {
  console.log('server started on port 3333');
});
