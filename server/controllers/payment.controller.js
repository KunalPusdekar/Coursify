import crypto from 'crypto';

import AppError from "../utils/error.util.js";
import {razorpay} from '../server.js';
import User from '../models/user.model.js'
import Payment from '../models/payment.model.js';

const getRazorpayApiKey = async(req,res,next)=>{
   try{ 
    res.status(200).json({
        success:true,
        message:'Razarpay API key',
        key: process.env.RAZORPAY_KEY_ID,
    });
    }catch(e){
        return next(
            new AppError(e.message,500)
        )
    }
}

const buySubscription = async(req,res,next)=>{
    try {
        const {id} = req.user;
        const user =await User.findById(id);

     if(!user){
        return next(
            new AppError('Unauthorized , please login')
        )
     }

     if(user.role ==='ADMIN'){
        return next(
            new AppError('Admin cannot purchase a subscription',400)
        )  
     }
     
     const subscription = await razorpay.subscriptions.create({
        plan_id:process.env.RAZORPAY_PLAN_ID,
        customer_notify: 1,
        total_count:12,
     })

     user.subscription.id= subscription.id;
     user.subscription.status= subscription.status;

     await user.save();

     res.status(200).json({
        success:true,
        message:'Subcribed successfully',
        subscription_id:subscription.id
     });
    }catch(e){
        return next(
            new AppError(e.message,500)
        )
    }
}

const verifySubscription = async(req,res,next)=>{
  try{
    const {id} =req.user;
  const {razorpay_payment_id , razorpay_signature , razorpay_subscription_id} = req.body;
  
  const user = await User.findById(id);
  if(!user){
    return next(
        new AppError('Unauthorized , please login')
    )
 }

 const subscriptionId  = user.subscription.id;
 
 const generatedSignature = crypto
   .createHmac('sha256',process.env.RAZORPAY_SECRET)
   .update(`${razorpay_payment_id}|${subscriptionId}`)
   .digest('hex');

   console.log('Generated Signature:', generatedSignature);
 console.log('Received Signature:', razorpay_signature);
 if(generatedSignature !== razorpay_signature) {
   return next(
    new AppError('Payment not verified, please try again',400)
   )
 } 
 

 await Payment.create({
    razorpay_payment_id,
    razorpay_signature,
    razorpay_subscription_id
 })

 user.subscription.status = 'active';
 await user.save();

 res.status(200).json({
    success:true,
    message:'Payment verified successfully',

 })
}catch(e){
    return next(
        new AppError(e.message,500)
    )
}
}

// const cancelSubcription = async(req,res,next)=>{
//    try{ 
//     const {id} = req.user;

//     const user = await User.findById(id);
//     if(!user){
//         return next(
//             new AppError('Unauthorized , please login',401)
//         )
//      }

//      if(user.role ==='ADMIN'){
//         return next(
//             new AppError('Admin cannot purchase a subscription',400)
//         )  
//      }
   
//      const subscriptionId = user.subscription.id;

//      const subscription  = await razorpay.subscriptions.cancel(
//         subscriptionId

//      )

//      user.subscription.status = subscription.status;

//      await user.save();
    
//     const payment = await Payment.findOne({
//         razorpay_subscription_id: subscriptionId,
//       });
    
//       // Getting the time from the date of successful payment (in milliseconds)
//       const timeSinceSubscribed = Date.now() - payment.createdAt;
    
//       // refund period which in our case is 14 days
//       const refundPeriod = 14 * 24 * 60 * 60 * 1000;
    
//       // Check if refund period has expired or not
//       if (refundPeriod <= timeSinceSubscribed) {
//         return next(
//           new AppError(
//             'Refund period is over, so there will not be any refunds provided.',
//             400
//           )
//         );
//       }
    
//       // If refund period is valid then refund the full amount that the user has paid
//       await razorpay.payments.refund(payment.razorpay_payment_id, {
//         speed: 'optimum', // This is required
//       });
    
//       user.subscription.id = undefined; // Remove the subscription ID from user DB
//       user.subscription.status = undefined; // Change the subscription Status in user DB
    
//       await user.save();
//       await payment.remove();
    
//       // Send the response
//       res.status(200).json({
//         success: true,
//         message: 'Subscription canceled successfully',
//       });
//     }catch(error){
//       return next(
//            new AppError(error.message || 'An error occurred while canceling the subscription', error.statusCode || 500)
//       )
//   }
// }
const cancelSubcription = async (req, res, next) => {
  try {
      const { id } = req.user;
      console.log('User ID:', id);

      const user = await User.findById(id);
      if (!user) {
          console.log('User not found');
          return next(
              new AppError('Unauthorized, please login', 401)
          );
      }

      if (user.role === 'ADMIN') {
          console.log('Admin attempted to cancel subscription');
          return next(
              new AppError('Admin cannot purchase or cancel a subscription', 400)
          );
      }

      const subscriptionId = user.subscription.id;
      console.log('Subscription ID:', subscriptionId);

      // Cancel the subscription
      const subscription = await razorpay.subscriptions.cancel(subscriptionId);
      console.log('Subscription canceled:', subscription);

      user.subscription.status = subscription.status;
      console.log('Updated user subscription status:', user.subscription.status);

      // Log the user object before saving
      console.log('User object before save:', user);

      await user.save(); // This is where the error is likely occurring
      console.log('User subscription status saved successfully');

      // Handle refund if within the refund period
      const payment = await Payment.findOne({
          razorpay_subscription_id: subscriptionId,
      });
      if (!payment) {
          console.log('Payment record not found for subscription ID:', subscriptionId);
          return next(
              new AppError('Payment record not found', 404)
          );
      }
      console.log('Payment found:', payment);

      const timeSinceSubscribed = Date.now() - payment.createdAt;
      const refundPeriod = 14 * 24 * 60 * 60 * 1000; // 14 days in milliseconds

      if (timeSinceSubscribed <= refundPeriod) {
          console.log('Processing refund for payment ID:', payment.razorpay_payment_id);
          await razorpay.payments.refund(payment.razorpay_payment_id, {
              speed: 'optimum',
          });
      } else {
          console.log('Refund period expired for payment ID:', payment.razorpay_payment_id);
          return next(
              new AppError('Refund period is over, so there will not be any refunds provided.', 400)
          );
      }

      // Clear user's subscription details
      user.subscription.id = undefined;
      user.subscription.status = undefined;
      await user.save();
      console.log('User subscription details cleared');

      await payment.deleteOne({ _id: payment._id });
      console.log('Payment record removed');

      // Send the response
      res.status(200).json({
          success: true,
          message: 'Subscription canceled successfully',
      });
  } catch (error) {
      console.error('Error in cancelSubscription:', error);
      return next(
          new AppError(error.message || 'An error occurred while canceling the subscription', error.statusCode || 500)
      );
  }
};


const allPayments = async (req, res, _next) => {
    const { count, skip } = req.query;
  
    // Find all subscriptions from razorpay
    const allPayments = await razorpay.subscriptions.all({
      count: count ? count : 10, // If count is sent then use that else default to 10
      skip: skip ? skip : 0, // // If skip is sent then use that else default to 0
    });
  
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
  
    const finalMonths = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    };
  
    const monthlyWisePayments = allPayments.items.map((payment) => {
      // We are using payment.start_at which is in unix time, so we are converting it to Human readable format using Date()
      const monthsInNumbers = new Date(payment.start_at * 1000);
  
      return monthNames[monthsInNumbers.getMonth()];
    });
  
    monthlyWisePayments.map((month) => {
      Object.keys(finalMonths).forEach((objMonth) => {
        if (month === objMonth) {
          finalMonths[month] += 1;
        }
      });
    });
  
    const monthlySalesRecord = [];
  
    Object.keys(finalMonths).forEach((monthName) => {
      monthlySalesRecord.push(finalMonths[monthName]);
    });
  
    res.status(200).json({
      success: true,
      message: 'All payments',
      allPayments,
      finalMonths,
      monthlySalesRecord,
    });
  };
export {
    getRazorpayApiKey,
    buySubscription,
    verifySubscription,
    cancelSubcription,
    allPayments
}