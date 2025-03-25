import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET as string;

export const generateToken=(id:string,email:string,isAdmin:boolean)=>{
    return jwt.sign(
        { userId: id, email: email,isAdmin:isAdmin }, SECRET);
}