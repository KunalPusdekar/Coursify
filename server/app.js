import express from 'express'
import cors from 'cors'
import cookieParse from 'cookie-parser'
import {config} from 'dotenv';
import morgan from 'morgan';
import userRoutes from './routes/user.routes.js'
import courseRoutes from './routes/course.routes.js'
import paymentRoutes from './routes/payment.routes.js'
import miscRoutes from './routes/miscellaneous.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';
config();
const app = express();


app.use(express.json());  //all the data goes in json format

app.use(express.urlencoded({extended:true}));

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
}))

app.use(cookieParse());
app.use(morgan('dev'));

app.use('/ping',function(req,res){
    res.send('pong');
})


app.use('/api/v1/user',userRoutes);
app.use('/api/v1/courses',courseRoutes);
app.use('/api/v1/payments',paymentRoutes);
app.use('/api/v1', miscRoutes);

//routes of 3 modules

app.all('*',(req,res)=>{
    res.status(404).send('OOPS !! 404 page not fount');
});

app.use(errorMiddleware);

export default app;