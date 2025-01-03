import {Router} from 'express';

import {getRazorpayApiKey , buySubscription , verifySubscription , cancelSubcription , allPayments} from '../controllers/payment.controller.js'
import { authorizeSubscriber, authorizedRoles, isLoggedIn } from '../middlewares/auth.middleware.js';
const router = Router();

router
  .route('/razorpay-key')
  .get(
    isLoggedIn,
    getRazorpayApiKey
    );

router
   .route('/subscribe')
   .post(
    isLoggedIn,
    buySubscription
    );

router 
    .route('/verify')
    .post(
        isLoggedIn,
        verifySubscription
        );
 
router
   .route('/unsubscribe')
   .post(
    isLoggedIn,
    authorizeSubscriber,
    cancelSubcription
    );

router
   .route('/')
   .get(
    isLoggedIn,
    authorizedRoles('ADMIN'),
    allPayments
    );
   
export default router;
   