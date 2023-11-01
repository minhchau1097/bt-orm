import express from "express";
import { userSignUp, userUpdate, userLogin, getUserInfor, uploadAvatar } from "../controllers/UserController.js";
import { upload } from "../controllers/uploadController.js";
import { authApi } from "../config/jwt.js";

const userRoote = express.Router();

userRoote.get('/get-user',authApi, getUserInfor)
userRoote.post('/sign-up', userSignUp)
userRoote.post('/login', userLogin)
userRoote.put('/update-user',authApi, userUpdate)
userRoote.put('/upload-avatar',authApi,upload.single('file'), uploadAvatar)


export default userRoote