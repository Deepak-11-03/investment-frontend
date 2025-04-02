import { UserDetailTypes } from '@/types/type';
import React from 'react'


interface Props{
    user?: UserDetailTypes
}
const UserDetail = ({user}:Props) => {

    if(!user){
        return <p>no details</p>
    }

  return (
      <div>
          <div>
              <h2>Personal Information</h2>
              <p><strong>Name:</strong> {user?.name}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Phone:</strong> {user?.phone}</p>
          </div>
          <div>
              <h2>Investment Details</h2>
              {user?.transactions && user?.transactions.length > 0 ? (
                  <table>
                      <thead>
                          <tr>
                              <th>Amount</th>
                              <th>Date</th>
                              <th>Type</th>
                          </tr>
                      </thead>
                      <tbody>
                          {user?.transactions.map((investment: any, index: number) => (
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
  )
}

export default UserDetail