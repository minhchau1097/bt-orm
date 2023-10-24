import express from 'express'
import { checkStatus, getComment, getImage, getImageDetail, searchImage, postComment, getSavedImage, getCreatedImage, deleteImage, postImage } from '../controllers/imageController.js'
import { authApi } from '../config/jwt.js'
import { upload } from "../controllers/uploadController.js";
const imageRoote = express.Router()
imageRoote.get('/get-image', authApi, getImage)
imageRoote.get('/search-image/:imageName', authApi, searchImage)
imageRoote.get('/get-image-detail/:id', authApi, getImageDetail)
imageRoote.get('/get-comment/:id', authApi, getComment)
imageRoote.get('/status-image/:id', authApi, checkStatus)
imageRoote.get('/saved-image', authApi, getSavedImage)
imageRoote.get('/created-image', authApi, getCreatedImage)

imageRoote.delete('/delete-image/:id', authApi, deleteImage)

imageRoote.post('/comment', authApi, postComment)
imageRoote.post('/post-image', authApi, upload.single('file'), postImage)

export default imageRoote