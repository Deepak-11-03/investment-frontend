import connectDB from "@/config/db";
import User from "@/models/User";
import generatePassword from "@/utils/generatePassword";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

// const handler =async(req:NextRequest,res:any)=>{
//     if(req.method === 'POST'){
//         const { name, email, phone,investedAmount, investedDate  } = await req.json();

//         const userExist = await User.findOne({email:email,phone:phone});
        
//         if(userExist){
//             return NextResponse.json({ success: false, message: "User with this email or phone number is already exist" }, { status: 400 });
//         }
    
//         const password = generatePassword(name,phone)
    
//         const user = await User.create({name,phone,email,password,investments:[{investedAmount,investedDate}]})
            
//         return NextResponse.json({ success: true, message: "User created" , data:user }, { status: 200 });
//     }
// }




export async function POST(req: Request) {
    const { name, email, phone,investedAmount, investedDate  } = await req.json();

        const token = (await cookies()).get("token")?.value;
        if (!token) {
          return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
    
        // Verify token
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    
        if (!decoded || !decoded.userId) {
          return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
        }
        
        const adminUser = await User.findOne({_id:decoded?.userId,isAdmin:true})
        
        if(!adminUser){
            return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
        }

    const userExist = await User.findOne({email:email,phone:phone});
    
    if(userExist){
        return NextResponse.json({ success: false, message: "User with this email or phone number is already exist" }, { status: 400 });
    }

    const password = generatePassword(name,phone)

    const user = await User.create({name,phone,email,password,investments:[{investedAmount,investedDate}]})
        
    return NextResponse.json({ success: true, message: "User created" , data:user }, { status: 200 });
   
}

export async function GET(req: NextRequest) {

    try {

      await connectDB();

      console.log('first')
       
      // const token = (await cookies()).get("token")?.value;
      // if (!token) {
      //   return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
      // }
  
      // // Verify token
      // const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
  
      // if (!decoded || !decoded.userId) {
      //   return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
      // }

      
      // const adminUser = await User.findOne({_id:decoded?.userId,isAdmin:true})
      
      // if(!adminUser){
      //     return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
      // }
        const users = await User.find({isAdmin:false});
    
        // if (!user) {
        //     return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        // }
        return NextResponse.json({ success: true, data: users }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }  
}
