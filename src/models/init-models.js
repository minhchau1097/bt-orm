import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _comments from  "./comments.js";
import _images from  "./images.js";
import _save_image from  "./save_image.js";
import _users from  "./users.js";

export default function initModels(sequelize) {
  const comments = _comments.init(sequelize, DataTypes);
  const images = _images.init(sequelize, DataTypes);
  const save_image = _save_image.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  comments.belongsTo(images, { as: "image", foreignKey: "image_id"});
  images.hasMany(comments, { as: "comments", foreignKey: "image_id"});
  save_image.belongsTo(images, { as: "image", foreignKey: "image_id"});
  images.hasMany(save_image, { as: "save_images", foreignKey: "image_id"});
  comments.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(comments, { as: "comments", foreignKey: "user_id"});
  images.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(images, { as: "images", foreignKey: "user_id"});
  save_image.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(save_image, { as: "save_images", foreignKey: "user_id"});

  return {
    comments,
    images,
    save_image,
    users,
  };
}
