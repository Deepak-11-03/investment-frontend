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
        const response = await User.findOneAndUpdate({email: adminData.email,isDeleted:false},{$set:{password:adminData.password}})

        if(!response){
            await User.create(adminData)
            console.log('Admin user created successfully');
        }
        
        console.log('Admin already created');
    } catch (error) {
        console.error('Error creating admin user:', error);
        throw error;
    }
}