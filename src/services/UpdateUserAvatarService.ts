import { getRepository } from 'typeorm';

import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  user_id: string;
  avatarFilename: string;
}
class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    // verificação se o user é válido
    const user = await usersRepository.findOne(user_id);

    // se não emcontrou o user
    if (!user) {
      throw new AppError(
        'Somente usuários altenticados pode trocar avatar',
        401,
      );
    } // se o usuario ja tem um avat
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFilename; // atualizar e salvar o novo avatar no db
    await usersRepository.save(user);
    return user;
  }
}
export default UpdateUserAvatarService;
