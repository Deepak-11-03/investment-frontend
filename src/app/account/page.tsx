import { Suspense } from "react";
import AccountDetails from "./AccountDetails";
import AccountShimmer from "./AccountShimmer";



const MyProfile = async () => {
  // const session = await ()

  return (
    <div className="flex flex-col p-1 gap-8 max-w-6xl mx-auto pt-12 sm:p-6">
      <h2 className="text-3xl">My Account</h2>
      <Suspense fallback={<AccountShimmer/>}>
        <AccountDetails/>
      </Suspense>
    </div>
  );
};

export default MyProfile;
