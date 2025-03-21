import connectDB from "@/config/db";
import User from "@/models/User";
import generatePassword from "@/utils/generatePassword";
import { NextRequest, NextResponse } from "next/server";

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

    const userExist = await User.findOne({email:email,phone:phone});
    
    if(userExist){
        return NextResponse.json({ success: false, message: "User with this email or phone number is already exist" }, { status: 400 });
    }

    const password = generatePassword(name,phone)

    const user = await User.create({name,phone,email,password,investments:[{investedAmount,investedDate}]})
        
    return NextResponse.json({ success: true, message: "User created" , data:user }, { status: 200 });
   
}
// export async function GET(req: NextRequest, { params }: { params: { id?: string } }) {

//     try {
//         const userId = params.id;

//         if (!userId) {
//             return NextResponse.json({ success: false, message: "User ID is required" }, { status: 400 });
//         }
    
//         const user = await User.findById(userId);
    
//         if (!user) {
//             return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
//         }
//         return NextResponse.json({ success: true, data: user }, { status: 200 });
//     } catch (error) {
//         return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//     }


 

   
// }
