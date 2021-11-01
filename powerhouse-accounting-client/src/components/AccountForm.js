import { useEffect, useState } from "react"
import { Form, Button } from "react-bootstrap"
import Money from './Money'

const AccountForm = ({account, onSubmit, className}) => {
    const [accountName, setAccountName] = useState(account ? account.accountName : '')

    useEffect(() => {
        setAccountName(account ? account.accountName : '')
    }, [account])

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({id: account ? account.id : null, accountName})
    }

    return (
        <Form onSubmit={handleSubmit} className={className}>
            <Form.Group className="mb-3">
                <Form.Label>Account No.</Form.Label>
                <Form.Control plaintext defaultValue={account ? account.accountNumber : '<new account>'} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Account Name</Form.Label>
                <Form.Control required type="text" value={accountName} onChange={(e) => setAccountName(e.target.value) } />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Balance</Form.Label>
                <div>{account ? <Money amount={account.balance} /> : '<new account>'}</div>                
            </Form.Group>
            <Button variant="primary" type="submit" className="me-2">Save</Button>
            <Button variant="secondary" type="reset">Reset</Button>
        </Form>        
    )
}

export default AccountForm