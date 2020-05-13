import path from 'path'; // passar o caminho para que todos os sistemas operacionais entenda
import crypto from 'crypto'; // para arquivo gerar hash, criptografados
import multer from 'multer'; // biblioteca para armazenamento de arquivos

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
// metodo para armazenar as imagens de avatar n propria maquina
export default {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const fileName = `${fileHash}-${file.originalname}`; // gerar o nome do arquivo

      return callback(null, fileName);
    },
  }),
};
