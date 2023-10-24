//yarn add multer
import multer, { diskStorage } from "multer";
// __dirname => node_35/src/routes

export const upload = multer({
  storage: diskStorage({
    destination: process.cwd() + "/public/img", // nơi lưu tài nguyên => định dạng là đường dẫn
    filename: (req, file, callback) => {
      callback(null, new Date().getTime() + "_" + file.originalname); // không trùng tên
    }, //nơi đổi tên tài nguyên
  }),
});