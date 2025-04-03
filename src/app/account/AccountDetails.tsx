import { getMyAccountData } from '@/actions/userActions';
import UserDetail from '@/components/UserDetail';

const AccountDetails = async () => {
    const data = await getMyAccountData(); // Fetching data on the server

    if (!data) {
        return <div>No account details found.</div>;
    }


    return (
        <UserDetail user={data} />
    );
};

export default AccountDetails;