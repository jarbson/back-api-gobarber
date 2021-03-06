import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface TokenFayload {
  iat: string;
  exp: string;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // Validação do token jwt
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401); // validação caso o token não exista
  }
  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, authConfig.jwt.secret); // validação caso o token exista

    const { sub } = decoded as TokenFayload; // metodo que identifica qual usuario esta fazendo a requisição
    request.user = {
      id: sub,
    };
    return next();
  } catch {
    throw new AppError('invalid JWT token', 401);
  }
}
