import { getUserProfile } from '@/actions/userActions';
import React from 'react';

const AccountDetails = async () => {
    const data = await getUserProfile(); // Fetching data on the server

    if (!data) {
        return <div>No account details found.</div>;
    }

    const { name, email, phone, investments } = data;

    return (
        <div>
            <div>
                <h2>Personal Information</h2>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Phone:</strong> {phone}</p>
            </div>
            <div>
                <h2>Investment Details</h2>
                {investments && investments.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {investments.map((investment: any, index: number) => (
                                <tr key={index}>
                                    <td>{investment.amount}</td>
                                    <td>{new Date(investment.date).toLocaleDateString()}</td>
                                    <td>{investment.type}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No investments found.</p>
                )}
            </div>
        </div>
    );
};

export default AccountDetails;