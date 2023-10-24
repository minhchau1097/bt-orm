import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import bcrypt from "bcrypt";
import { createToken, decodeToken } from "../config/jwt.js";
import compress_images from "compress-images";
let model = initModels(sequelize);

const userSignUp = async (req, res) => {
  let { email, pass_word } = req.body;
  if (!email) return res.send('Email không được rỗng')
  if (!pass_word) return res.send('Mật khẩu không được rỗng')
  let checkMail = await model.users.findOne({
    where: {
      email
    }
  });
  if (checkMail) return res.send('Email đã tồn tại');
  let passCrypt = bcrypt.hashSync(pass_word, 10);
  let newData = {
    full_name: '',
    email,
    pass_word: passCrypt,
    avatar: '',
    age: 0,
  }
  await model.users.create(newData)
  res.send({...newData, pass_word : ''});
};
const userLogin = async (req, res) => {
  let { email, pass_word } = req.body;
  if (!email) return res.send('Email không được rỗng')
  if (!pass_word) return res.send('Mật khẩu không được rỗng')
  let checkEmail = await model.users.findOne({
    where: {
      email,
    },
  });
  if (checkEmail) {
    if (bcrypt.compareSync(pass_word, checkEmail.pass_word)) {
      // trả về true hoặc false
      let newData = {
        user_id: checkEmail.user_id,
        full_name: checkEmail.full_name,
        email: checkEmail.email,
        avatar: checkEmail.avatar,
        age: checkEmail.age,
      }
      let token = createToken(newData);
      res.send(token);
    } else {
      res.send("Mật khẩu không đúng");
    }
  } else {
    res.send("Email không đúng");
  }
};
const getUserInfor = async (req, res) => {
  let { token } = req.headers;
  let userInfor = decodeToken(token)
  let { user_id } = userInfor.data
  let data = await model.users.findOne({
    where: {
      user_id
    }
  })
  let { pass_word, ...clone } = data
  let newData = clone.dataValues
  delete newData.pass_word
  res.send(newData)
}
const userUpdate = async (req, res) => {
  let { email, pass_word, new_pass, full_name, age } = req.body;
  let { token } = req.headers;
  let userInfor = decodeToken(token)
  let checkEmail = await model.users.findOne({
    where: {
      user_id: userInfor.data.user_id,
    },
  });
  if (checkEmail) {
    if (bcrypt.compareSync(pass_word, checkEmail.pass_word)) {
      let passCrypt = bcrypt.hashSync(new_pass, 10);
      checkEmail = { ...checkEmail, full_name, email, age, pass_word: passCrypt }
     await model.users.update(checkEmail, {
        where: {
          user_id: userInfor.data.user_id
        }
      })
      res.send('Cập nhật thành công')
    } else {
      res.send('Mật khẩu không đúng')
    }
  } else {
    res.send('Email không đúng')
  }
}
const uploadAvatar = async (req, res) => {
  let { token } = req.headers;

  let userInfor = decodeToken(token)
  let { user_id } = userInfor.data;
  let file = req.file;
  let infoUser = await model.users.findOne({
    where: {
      user_id: user_id
    }
  })
  if (!file) return res.send(infoUser.avatar)
  infoUser = { ...infoUser, avatar: file ? file.filename : '' };

  // UPDATE users SET ... WHERE user_id =1
  await model.users.update(infoUser, {
    where: {
      user_id: user_id
    }
  })

  await compress_images(
    process.cwd() + "/public/img/" + file.filename,
    process.cwd() + "/public/file/",
    { compress_force: false, statistic: true, autoupdate: true },
    false,
    { jpg: { engine: "mozjpeg", command: ["-quality", "25"] } },
    { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
    { svg: { engine: "svgo", command: "--multipass" } },
    {
      gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] },
    },
    function (error, completed, statistic) {

    }
  );
  res.send(file.filename);
}
export { userSignUp, userUpdate, userLogin, getUserInfor, uploadAvatar }