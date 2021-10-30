import { useEffect, useState } from "react"
import useSignalR from '../hooks/UseSignalR'
import { useParams, Redirect } from 'react-router-dom'
import AccountForm from './AccountForm'
import TransactionList from './TransactionList'
import TransactionForm from "./TransactionForm"
import { LinkContainer } from "react-router-bootstrap"
import { Breadcrumb } from "react-bootstrap"

const API_URL = process.env.REACT_APP_API_URL

const Account = () => {
    let { accountId } = useParams()
    const [account, setAccount] = useState()
    const [transactions, setTransactions] = useState([])
    const [newAccountId, setNewAccountId] = useState()
    const connection = useSignalR(API_URL)

    const fetchData = async () => {
        try {
            const parsedAccountId = parseInt(accountId)
            const acct = await connection.invoke('FindAccount', parsedAccountId)
            const trans = await connection.invoke('ListTransactions', parsedAccountId)
            setAccount(acct)
            setTransactions(trans)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {    
        console.log('running effect...')    
        if (accountId && connection) {
            connection.on('NotifyChange', () => {
                fetchData()
            })
            fetchData()
        }
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
            amount = parseFloat(amount)
            await connection.invoke('ExecuteTransaction', accountId, amount)
        } catch (error) {
            console.log(error)
        }
    }

    if (newAccountId) {
        return <Redirect to={`/account/${newAccountId}`} />
    }

    return (
        <>
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