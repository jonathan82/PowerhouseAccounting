import { Alert } from "react-bootstrap"

const ErrorList = ({errors}) => {
    if (!errors) {
        return <></>
    }
    return (
        <Alert variant="danger">
            An error occurred:
            <ul>
                {errors.map((e) => <li>{e}</li>)}
            </ul>
        </Alert>
    )
}

export default ErrorList