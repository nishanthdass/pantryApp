import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    

  destination: function (req, file, cb) {
    cb(null, '../backend/uploads/'); // The folder where the uploaded files will be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extname = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extname);
  }
});

const upload = multer({ storage: storage });

export default upload;