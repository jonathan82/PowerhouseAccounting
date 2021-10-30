import { useState } from "react"
import { Form, Button } from "react-bootstrap"

const TransactionForm = ({className, onSubmit}) => {
    const [amount, setAmount] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(amount)
    }

    return (
        <Form className={className} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Amount to Deposit(+)/Withdraw(-)</Form.Label>
                <Form.Control required type="number" value={amount} onChange={(e) => setAmount(e.target.value) } />
            </Form.Group>
            <Button variant="primary" type="submit">Execute</Button>
        </Form>
    )
}

export default TransactionForm