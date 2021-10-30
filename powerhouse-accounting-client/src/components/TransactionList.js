import { Table } from "react-bootstrap"
import Money from './Money'

const TransactionList = ({transactions}) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Remaining Balance</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((t) => 
                <tr key={t.id}>
                    <td>{t.transactionDate}</td>
                    <td><Money amount={t.amount} /></td>
                    <td><Money amount={t.balanceAfter} /></td>
                </tr>)}
            </tbody>
        </Table>
    )
}

export default TransactionList
