import { useEffect, useState } from "react"
import useSignalR from '../hooks/UseSignalR'
import { useParams, Redirect } from 'react-router-dom'
import AccountForm from './AccountForm'
import TransactionList from './TransactionList'
import TransactionForm from "./TransactionForm"
import NotificationList from './NotificationList'
import { LinkContainer } from "react-router-bootstrap"
import { Breadcrumb } from "react-bootstrap"

const API_URL = process.env.REACT_APP_API_URL

const Account = () => {
    const params = useParams()
    const [account, setAccount] = useState()
    const [transactions, setTransactions] = useState([])
    const [newAccountId, setNewAccountId] = useState()
    const [connection, startConnection] = useSignalR(API_URL)
    const accountId = parseInt(params.accountId)

    useEffect(() => {
        let isMounted = true
        const fetchData = async () => {
            try {
                const acct = await connection.invoke('FindAccount', accountId)
                const trans = await connection.invoke('ListTransactions', accountId)
                if (isMounted) { //make sure we're not updating state on unmounted component
                    setAccount(acct)
                    setTransactions(trans)
                }
            } catch (error) {
                console.log(error)
            }
        }
        const start = async () => {
            if (accountId) {
                // existing account - fetch data
                connection.on('NotifyChange', () => {
                    fetchData()
                })
                await startConnection()
                fetchData()
            } else {
                // new account - just start the connection
                startConnection()
            }
        }
        start()
        return () => { isMounted = false }
    }, [])

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
            await connection.invoke('ExecuteTransaction', accountId, parseFloat(amount))
        } catch (error) {
            console.log(error.message)
        }
    }

    if ((!account && accountId) || !transactions) {
        return <div>Loading...</div>
    }

    return newAccountId ? <Redirect to={`/account/${newAccountId}`} /> : 
    (
        <>
            <NotificationList connection={connection} />
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