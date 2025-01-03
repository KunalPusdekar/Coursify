import {Schema, model }from 'mongoose';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
const userSchema =new Schema ({
  fullName :{
    type:String,
    required :[true,'Name is required'],
    minLength:[5,'Name must be at least 5 character'],
    maxLength:[50,'Name should be less than 50 characters'],
    lowercase:true,
    trim:true
  },
  email :{
    type:String,
    required:[true,'Email is required'],
   lowercase:true,
   trim:true,
   unique:true,
   match:[/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g,'Please fill in a valid email address'],
  },
  password:{
    type:String,
    required:[true,'Password is required'],
    minLength:[5,'Password must be at least 5 characters'],
    select :false     //IMPORTANT : select[false] is use for not recommending the password to the user.
  },
  avatar:{
    public_id:{
        type:String
    },
    secure_url :{
        type:String
    }
  },
  role:{
   type:String,
   enum:['USER','ADMIN'],
   default:'USER'
  },
  forgotPasswordToken :String,
  forgotPasswordExpiry:Date,

  subscription: {
    id:String,
    status:String
  }
},{
    timestamps:true,
});

//Hashes password before saving to the database
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
});

userSchema.methods = {

  comparePassword: async function (plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
  },
    generateJWTToken :async function(){
        return jwt.sign(
            {
                id:this._id,
                email:this.email,
                subscription :this.subscription,
                role:this.role
              },
                process.env.JWT_SECRET,
                {
                    expiresIn:process.env.JWT_EXPIRY,
                }
        );
    },
    

    generatePasswordResetToken : async function(){
       const resetToken = crypto.randomBytes(20).toString('hex');


       this.forgotPasswordToken = crypto
       .createHash('sha256')
       .update(resetToken)
       .digest('hex')
      ; 
       this.forgotPasswordExpiry=Date.now()+(30 * 60 * 1000) ; //30 min from now

       return resetToken ; 
    }
    
  
}

const User =model('User',userSchema);

export default User;