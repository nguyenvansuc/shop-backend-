import express from 'express';
import * as orderController from '../controllers/orderController.js'
import {checkLogin,checkAdmin} from '../auth.js'

const router=express.Router()

router.get('/myOrders',checkLogin,checkAdmin,orderController.getMyOrders)
router.post('/create',checkLogin,orderController.createOrder)
router.get('/accept/:idOrder',checkLogin,checkAdmin,orderController.acceptOrder)
router.delete('/delete/:idOrder',checkLogin,orderController.deleteOrder)

export default router