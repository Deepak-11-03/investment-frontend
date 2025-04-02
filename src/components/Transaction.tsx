import React from 'react'

const Transaction = ({transactions}:any) => {
  return (
    <div>
          {transactions && transactions.length > 0 ? (
              <table>
                  <thead>
                      <tr>
                          <th>Amount</th>
                          <th>Date</th>
                          <th>Type</th>
                      </tr>
                  </thead>
                  <tbody>
                      {transactions.map((investment: any, index: number) => (
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
  )
}

export default Transaction