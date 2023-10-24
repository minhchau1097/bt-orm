import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Sequelize } from "sequelize";
import { decodeToken } from "../config/jwt.js";
import compress_images from "compress-images";
let model = initModels(sequelize);
let Op = Sequelize.Op;
const getImage = async (req, res) => {
  let data = await model.images.findAll();
  res.send(data);
};
const searchImage = async (req, res) => {
  let { imageName } = req.params;
  let data = await model.images.findAll({
    where: {
      name: {
        [Op.like]: `%${imageName}%`
      }
    }
  });
  res.send(data);
};
const getImageDetail = async (req, res) => {
  let { id } = req.params;
  let detail = await model.images.findByPk(id, {
    include: ['user'],
  });
  res.send(detail);
};
const getComment = async (req, res) => {
  let { id } = req.params;
  let detail = await model.comments.findAll({
    where: {
      image_id: id
    }
  });
  res.send(detail);
};
const checkStatus = async (req, res) => {
  let { id } = req.params;
  let detail = await model.save_image.findOne({
    where: {
      image_id: id
    }
  });

  if (detail) {
    res.send(true);
    return
  }
  res.send(false)
};
const postComment = async (req, res) => {
  let { content, image_id } = req.body;
  if (!content) return res.send('Nội dung không được rỗng')
  if (!image_id) return res.send('Id hình không được rỗng')
  let { token } = req.headers;
  let userInfor = decodeToken(token);
  let { user_id } = userInfor.data;
  let newData = {
    image_id,
    user_id,
    content,
    date_comment: new Date()
  }
  model.comments.create(newData)
  res.send('Bình luận thành công')
}
const getSavedImage = async (req, res) => {
  let { token } = req.headers;
  let userInfor = decodeToken(token);
  let { user_id } = userInfor.data;
  let data = await model.save_image.findAll({
    where: {
      user_id
    },
    include: ['image']
  })
  res.send(data)

}
const getCreatedImage = async (req, res) => {
  let { token } = req.headers;
  let userInfor = decodeToken(token);
  let { user_id } = userInfor.data;

  let data = await model.images.findAll({
    where: {
      user_id
    }
  })
  res.send(data)
  return
}
const deleteImage = async (req, res) => {
  let { id } = req.params;
  if (!id) return res.send('Id không được rỗng')
  let checkStatus = await model.images.findByPk(id)
  if (checkStatus) {
    await model.images.destroy({
      where: {
        image_id: id
      }
    })
    res.send('Xoá thành công')
  } else {
    res.send('Đã xoá rồi')
  }

}
const postImage = async (req, res) => {
  let { description } = req.body;
  let { token } = req.headers;
  let file = req.file;
  let userInfor = decodeToken(token);
  let { user_id } = userInfor.data;
  if (!description) return res.send('Mô tả không được rỗng')
  if (!file) return res.send("File không được rỗng")
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
  let newData = {
    user_id,
    source: file.filename,
    name: file.originalname,
    description
  }
  await model.images.create(newData)
  res.send(newData)
}
export { searchImage, getImage, getImageDetail, getComment, checkStatus, postComment, getSavedImage, getCreatedImage, deleteImage, postImage }