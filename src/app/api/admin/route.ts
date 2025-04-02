import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST() {
    

    return NextResponse.json({ success: false, message: "Can't access this api" }, { status: 400 });

    const userExist = await User.findOne({email:process.env.ADMIN_EMAIL});
    
    if(userExist){
        return NextResponse.json({ success: true, message: "Admin Created" }, { status: 200 });
    }

    let adminData ={
        name: process.env.ADMIN_NAME,   
        email: process.env.ADMIN_EMAIL,     
        pass: process.env.ADMIN_PASS  ,  
        phone: process.env.ADMIN_CONTACT  
    }

    const user = await User.create(adminData)
        
    return NextResponse.json({ success: true, message: "Admin created" , data:user }, { status: 200 });
   
}