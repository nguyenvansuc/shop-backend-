import express from 'express';
import * as userController from '../controllers/userController.js'
// import { checkLogin } from '../controllers/authentic.js';

const router=express.Router()

router.post('/signIn',userController.getUser)
router.post('/signUp',userController.createUser)
router.get('/all',userController.getAllUser)

export default router