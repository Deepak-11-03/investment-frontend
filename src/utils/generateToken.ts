import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET as string;

export const generateToken=(id:string,email:string)=>{
    return jwt.sign(
        { userId: id, email: email }, SECRET);
}