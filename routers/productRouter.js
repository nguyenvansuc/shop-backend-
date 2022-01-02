import express from 'express';
import * as productController from '../controllers//productController.js'
import {checkLogin,checkAdmin} from '../auth.js'

const router=express.Router()

router.get('/allProducts',productController.getAllProducts)
router.delete('/delete/:idProduct',checkLogin,checkAdmin,productController.deleteProduct)
router.get('/details/:idProduct',productController.getDetailsProduct)
router.post('/add',productController.addNewProduct)

export default router