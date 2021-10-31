import { useEffect, useState } from "react"
import useSignalR from '../hooks/UseSignalR'
import { useParams, Redirect } from 'react-router-dom'
import AccountForm from './AccountForm'
import TransactionList from './TransactionList'
import TransactionForm from "./TransactionForm"
import Notifications from './Notifications'
import { LinkContainer } from "react-router-bootstrap"
import { Breadcrumb, ToastContainer, Toast } from "react-bootstrap"

const API_URL = process.env.REACT_APP_API_URL

const Account = () => {
    let { accountId } = useParams()
    const [account, setAccount] = useState()
    const [transactions, setTransactions] = useState([])
    const [newAccountId, setNewAccountId] = useState()
    const connection = useSignalR(API_URL)

    let isMounted = true
    const fetchData = async () => {
        try {
            const parsedAccountId = parseInt(accountId)
            const acct = await connection.invoke('FindAccount', parsedAccountId)
            const trans = await connection.invoke('ListTransactions', parsedAccountId)
            if (isMounted) {
                setAccount(acct)
                setTransactions(trans)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (isMounted && accountId && connection) {
            connection.on('NotifyChange', () => {
                fetchData()
            })
            fetchData()
        }
        return () => { isMounted = false }
    }, [connection])

    if ((!account && accountId) || !transactions) {
        return <div>Loading...</div>
    }

    const handleSaveAccount = async (input) => {
        try {
            const savedId = await connection.invoke('SaveAccount', input)
            if (!accountId) {
                setNewAccountId(savedId)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleExecuteTransaction = async (amount) => {
        try {
            const parsedAccountId = parseInt(accountId)
            amount = parseFloat(amount)
            await connection.invoke('ExecuteTransaction', parsedAccountId, amount)
        } catch (error) {
            console.log(error.message)
        }
    }

    if (newAccountId) {
        return <Redirect to={`/account/${newAccountId}`} />
    }

    return (
        <>
            <Notifications connection={connection} />
            <Breadcrumb>
                <LinkContainer to="/">
                    <Breadcrumb.Item>Account List</Breadcrumb.Item>
                </LinkContainer>
                <Breadcrumb.Item active>Account</Breadcrumb.Item>
            </Breadcrumb>
            <h3>Account Information</h3>
            <AccountForm account={account} onSubmit={handleSaveAccount} className="mb-4"></AccountForm>
            {accountId ?
                <>
                    <h3>Deposit/Withdraw</h3>
                    <TransactionForm className="mb-4" onSubmit={handleExecuteTransaction} />
                    <h3>Transactions</h3>
                    <TransactionList transactions={transactions} />
                </>
                : ''}
        </>
    )
}

export default Account