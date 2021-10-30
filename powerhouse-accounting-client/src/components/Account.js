import { useEffect, useState } from "react"
import useSignalR from '../hooks/UseSignalR'
import { Link, useParams } from 'react-router-dom'
import AccountForm from './AccountForm'
import { LinkContainer } from "react-router-bootstrap"
import { Breadcrumb } from "react-bootstrap"

const API_URL = process.env.REACT_APP_API_URL

const Account = () => {
    let { accountId } = useParams()
    accountId = parseInt(accountId)
    const [account, setAccount] = useState()
    const [transactions, setTransactions] = useState([])
    const connection = useSignalR(API_URL)

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('accountId: ' + accountId)
                const acct = await connection.invoke('FindAccount', accountId)
                const trans = await connection.invoke('ListTransactions', accountId)
                setAccount(acct)
                setTransactions(trans)
            } catch (error) {
                console.log(error)
            }
        }
        if (accountId && connection) {
            fetchData()
        }
    }, [connection])

    if ((!account && accountId) || !transactions) {
        return <div>Loading...</div>
    }

    const handleSaveAccount = async (input) => {
        console.log(connection)
        try {
            await connection.invoke('SaveAccount', input)            
        } catch (error) {
            console.log(error)
        }        
    }

    return (
        <>
            <Breadcrumb>
                <LinkContainer to="/">
                    <Breadcrumb.Item>Account List</Breadcrumb.Item>
                </LinkContainer>                
                <Breadcrumb.Item active>Account</Breadcrumb.Item>
            </Breadcrumb>
            <AccountForm account={account} onSubmit={handleSaveAccount}></AccountForm>
        </>
    )
}

export default Account