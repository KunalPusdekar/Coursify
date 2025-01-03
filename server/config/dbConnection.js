import mongoose from 'mongoose';

mongoose.set('strictQuery',false); //if we give extra data then it can't show a error.

const MONGO_URI=  process.env.MONGO_URI ;
const connectioToDB = async ()=>{
try  { 
    const {connection } = await mongoose.connect(
        MONGO_URI
    )
   if(connection){
    console.log(`Connected to MongoDB : ${MONGO_URI}`);
   }
}
catch(e){
    console.log(e);
    process.exit(1);
}
};

export default connectioToDB;