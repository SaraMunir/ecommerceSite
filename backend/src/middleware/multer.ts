import multer from 'multer';

const storage = multer.diskStorage({
  filename: function (req: any,file: { originalname: any; },cb: (arg0: null, arg1: any) => void) {
    cb(null, file.originalname)
  }
});

const upload = multer({storage: storage});

export default upload;