import { useEffect, useState } from "react"
import { ToastContainer, Toast } from "react-bootstrap"

const Notifications = ({ connection }) => {
    const [notifications, setNotifications] = useState([])
    
    useEffect(() => {
        connection.on('NotifySuccess', (message) => {
            setNotifications([...notifications, {type: 'success', message }])
        })
        connection.on('NotifyError', (message) => {
            setNotifications([...notifications, {type: 'danger', message }])
        })
    }, [])

    const handleClose = (e) => {
        console.log(e)
    }

    return (
        <ToastContainer position="top-center">
            {notifications.map((n) =>
                <Toast bg={n.type} autohide onClose={handleClose}>
                    <Toast.Header>
                        <strong className="me-auto">{n.type=='success' ? 'Success' : 'Error'}</strong>
                    </Toast.Header>
                    <Toast.Body className="text-light">{n.message}</Toast.Body>
                </Toast>
            )}
        </ToastContainer>
    )
}

export default Notifications