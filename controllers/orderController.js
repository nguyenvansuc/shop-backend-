import OrderModel from "../models/orderModel.js";
import UserModel from "../models/userModel.js";

export const getMyOrders=async(req,res) => {
    try {
        const checkAdmin=req.checkAdmin
        if(checkAdmin){
            let myOrders=await OrderModel.find({})
            return res.status(200).json({orders: myOrders})
        }
        let idUser=req.idUser
        const myOrders=await OrderModel.find({idUser:idUser})
        return res.status(200).json({orders: myOrders})
    } catch (error) {
        res.status(500).json(error);
    }
}

export const createOrder=async(req,res)=>{
    try {
        const idUser=req.idUser
        const user=await UserModel.findById(idUser);
        console.log(user)
        if(!user) return res.status(400)
        const newOrder=req.body
        const createNewOrder= new OrderModel(newOrder)
        await createNewOrder.save()
        return res.status(200).json({message:'Order completed !'})
    } catch (error) {
        res.status(500).json(error);
    }
}

export const acceptOrder=async(req,res)=>{
    try {
        const checkAdmin=req.checkAdmin
        if(!checkAdmin){
            return res.status(401)
        }
        const idOrder=req.params.idOrder
        const result=await OrderModel.findByIdAndUpdate(idOrder,{statusOrder:'accepted'})
        // console.log(result)
        return res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error);
    }
}

export const deleteOrder=async(req,res)=>{
    try {
        const idUser=req.idUser
        const user=await UserModel.findById(idUser)
        if(!user){
            return res.status(400)
        }
        const idOrder=req.params.idOrder
        console.log(idOrder)
        const order=await OrderModel.findById(idOrder)
        if(order.statusOrder==='accepted'){
            return
        }
        await OrderModel.findByIdAndDelete(idOrder)
        return res.json({message:'deleted this order !'})
    } catch (error) {
        res.status(500).json(error);
    }
}