import { useEffect, useState } from "react"
import { Table, Breadcrumb } from "react-bootstrap"
import useSignalR from '../hooks/UseSignalR'
import {Link} from 'react-router-dom'
import Money from './Money'

const API_URL = process.env.REACT_APP_API_URL

const AccountList = () => {
    const connection = useSignalR(API_URL)
    const [accounts, setAccounts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accts = await connection.invoke('ListAccounts')                
                setAccounts(accts)
            } catch (error) {
                console.log('cannot fetch accounts: ' + error)
            }                        
        }        
        if (connection) {
            fetchData()            
        }        
    },[connection])

    const accountList = accounts.map((acc) => {
        return (
            <tr key={acc.id}>
                <td><Link to={`/account/${acc.id}`}>{acc.accountNumber}</Link></td>
                <td>{acc.accountName}</td>
                <td><Money amount={acc.balance} /></td>
            </tr>)
    })

    return (
        <>
            <Breadcrumb>               
                <Breadcrumb.Item active>Account List</Breadcrumb.Item>
            </Breadcrumb>
            <Link className="btn btn-primary mb-3" to="/account">Create Account</Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Account No</th>
                        <th>Account Name</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {accountList}
                </tbody>                
            </Table>
        </>
    )
}

export default AccountList