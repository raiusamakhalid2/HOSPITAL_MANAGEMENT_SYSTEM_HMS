import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerOptions = {
  storage: diskStorage({
    destination: './uploads/doctor',
    filename: (file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension = extname(file.originalname);
      const filename = `${uniqueSuffix}${extension}`;
      callback(null, filename);
    },
  }),
};
