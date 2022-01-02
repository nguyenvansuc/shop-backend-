import jwt from 'jsonwebtoken';
import UserModel from './models/userModel.js'

export const checkLogin = async (req, res, next) => {
  try {
    let token = null;
    console.log(req.headers.authorization, 'xxx');
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
      console.log({ token }, 'token');
    }
    if (token === 'null') {
      return res.status(401).json({ message: 'No Logged in !' });
    }
    jwt.verify(token, 'userToken', function (error, decode) {
      if (error) {
        return res.status(400).json({ message: error });
      }
      const idUser = decode?.id;
      req.idUser = idUser;
      next();
    });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const checkAdmin=async(req, res, next)=>{
    try {
        const idUser=req.idUser
        const user=await UserModel.findById(idUser)
        if(!user){
            return res.json({ message:'IncorrectUser !'})
        }
        if(user.rules==='admin'){
            req.checkAdmin=true
        }else{
            req.checkAdmin=false
        }
        next()
    } catch (error) {
        return res.status(400).json({ message: error });
    }
}
