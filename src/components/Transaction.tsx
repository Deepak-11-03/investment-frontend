import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { TransactionTypes } from '@/types/type'
import { getAmountType, getTitleCase } from '@/utils'
import moment from 'moment'

interface Props {
    transactions: [TransactionTypes]
}

const Transaction = ({ transactions }: Props) => {
    // {transactions.map((investment: any, index: number) => (
    //     <tr key={index}>
    //         <td>{investment.amount}</td>
    //         <td>{new Date(investment.date).toLocaleDateString()}</td>
    //         <td>{investment.type}</td>
    //     </tr>
    // ))}
    return (
        <div className='max-h-[60vh] overflow-y-auto py-8'>
            {transactions && transactions.length > 0 ? (
                transactions.map((item: TransactionTypes) =>

                    <Card key={item?._id}>
                        <CardHeader>
                            <CardTitle className={`${item.type === 'credit' ? 'text-green-500' : 'text-red-500'}  flex flex-row justify-between`}>
                                <div>{getTitleCase(item.type)}</div>
                                <div>{getAmountType(item.amount, item.type)}</div>
                            </CardTitle>
                            <CardDescription className='flex flex-row justify-between'>
                                <div>Card Description</div>
                                <div>{moment(item.date, false).format('MMMM DD, YYYY')}</div>
                            </CardDescription>
                        </CardHeader>
                    </Card>

                )
            ) : (
                <p>No investments found.</p>
            )}
        </div>
    )
}

export default Transaction