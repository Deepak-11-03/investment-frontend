import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    investments:[
        {
            investedAmount:{
                type: String
            },
            investedDate:{
                type: Date
            }
        }
    ]
})


const User = mongoose.models.users || mongoose.model('users',UserSchema);

export default User;