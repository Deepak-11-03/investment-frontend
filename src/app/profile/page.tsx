import { checkUser } from "@/services/user.service";

const MyProfile = async () => {
  const data = await checkUser(); // Fetching data on the server

  return (
    <div>
      <h2>My Profile</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default MyProfile;
