import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import CurrencyInput from 'react-currency-input-field'

const TransactionForm = ({ className, onSubmit }) => {
    const [amount, setAmount] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(amount)
    }

    return (
        <Form className={className} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Amount to Deposit(+)/Withdraw(-)</Form.Label>
                {/* <Form.Control required type="number" value={amount} onChange={(e) => setAmount(e.target.value)} /> */}
                <CurrencyInput
                    required
                    className="form-control"
                    placeholder="Please enter a number"
                    defaultValue={amount}
                    decimalsLimit={2}
                    onValueChange={(value) => setAmount(value)}
                    prefix="$"
                />
            </Form.Group>
            <Button variant="primary" type="submit">Execute</Button>
        </Form>
    )
}

export default TransactionForm