import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../services/CreateUserService';

import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

// rota de criação de Users
usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();
    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password; // não mostrar password na listagem de users

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});
// patch: metodo usado para atualizar apenas uma informação do usuario, ao contrario do put que atualiza tudo, no caso aqui vai ser o avatar

// ensureAuthenticated: garante que o usuario esta autenticado para trocar o avatar

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const UpdateUserAvatar = new UpdateUserAvatarService(); // instanciando a class UpdateUserAvatarService (regra de negocio )
    const user = await UpdateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });
    delete user.password;
    return response.json({ user });
  },
);
export default usersRouter;
