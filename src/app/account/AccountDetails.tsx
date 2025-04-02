import { getUserProfile } from '@/actions/userActions';
import UserDetail from '@/components/UserDetail';
import React from 'react';

const AccountDetails = async () => {
    const data = await getUserProfile(); // Fetching data on the server

    if (!data) {
        return <div>No account details found.</div>;
    }


    return (
        <UserDetail user={data} />
    );
};

export default AccountDetails;