import { useEffect, useState } from "react"
import { Table, Button } from "react-bootstrap"

const TransactionList = ({transactions}) => {
    return (
        <Table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Remaining Balance</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((t) => 
                <tr>
                    <td>{t.transactionDate}</td>
                    <td>{t.amount}</td>
                    <td>{t.balanceAfter}</td>
                </tr>)}
            </tbody>
        </Table>
    )
}

export default TransactionList
