import { MESSAGE } from '@/constants/message';
import User from '@/models/User';
import { postData } from '@/services/http.service';


export async function createAdmin(): Promise<void> {
    try {
        let adminData ={
              name: process.env.ADMIN_NAME,   
              email: process.env.ADMIN_EMAIL,     
              password: process.env.ADMIN_PASS,  
              phone: process.env.ADMIN_CONTACT,
              isAdmin:true
          }
        const response = await User.findOneAndUpdate({ email: adminData.email, isAdmin: true, isDeleted: false }, { $set: { password: adminData.password } })

        if(!response){
            await User.create(adminData)
            console.log(MESSAGE.ADMIN_CREATED);
        }
        
    } catch (error) {
        console.error('Error creating admin user:', error);
        throw error;
    }
}