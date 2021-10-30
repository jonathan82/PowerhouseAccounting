const Money = ({amount}) => {
    return (
        <span>{new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount)}</span>
    )
}

export default Money