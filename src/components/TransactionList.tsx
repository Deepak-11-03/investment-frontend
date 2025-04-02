import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Transaction } from '@/types/type'
import { getAmountType, getTitleCase } from '@/utils'
import moment from 'moment'

interface Props {
    transactions: Transaction[]
}

const TransactionList = ({ transactions }: Props) => {
    return (
        <div className='max-h-[60vh] overflow-y-auto  mt-10'>
            {transactions && transactions.length > 0 ? (
                transactions.map((item: Transaction) =>
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

export default TransactionList