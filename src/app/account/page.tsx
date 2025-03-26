import { getUserProfile } from "@/actions/userActions";
import { checkUser } from "@/services/user.service";



const MyProfile = async () => {
  const data = await getUserProfile(); // Fetching data on the server
console.log(data,'vvvvvvvvvvvv')

  return (
    <div>
      <h2>My Profile</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default MyProfile;
