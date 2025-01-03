import AppError from "../utils/error.util.js";
import jwt from 'jsonwebtoken'
const isLoggedIn = (req,res,next)=>{
    const {token} = req.cookies;

    if(!token){
        return next(new AppError('Unauthenticated, please login again',400));
    }

   try{ 
    const userDetails= jwt.verify(token,process.env.JWT_SECRET);

    req.user = userDetails;

    next();
    }
    catch(e){
        return next(new AppError('Invalid token , please login again'));
    }
}
const authorizedRoles = (...roles) => async(req,res,next) =>{
    const currentUserRoles = req.user.role;
    if(!roles.includes(currentUserRoles)){
      return next(
        new AppError('You do not have permission to access this routes',403)
      )
    }
    next();
}

const authorizeSubscriber = async(req,res,next)=>{
     const subscription = req.user.subscription;

     const currentUserRole = req.user.role;
     if(currentUserRole === 'USER' && subscription.status !== 'active'){
        return next(
            new AppError('Please subscribe to access this route',403)
        )
     }
     next();
}
export {
    isLoggedIn,
    authorizedRoles,
    authorizeSubscriber
}