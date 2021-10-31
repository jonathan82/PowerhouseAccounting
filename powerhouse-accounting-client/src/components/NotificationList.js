import { useEffect, useState } from "react"
import { ToastContainer, Toast } from "react-bootstrap"

const NotificationList = ({ connection }) => {
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
        <ToastContainer position="top-center" className="position-fixed p-3">
            {notifications.map((n,i) =>
                <Toast bg={n.type} autohide onClose={handleClose} key={i}>
                    <Toast.Header>
                        <strong className="me-auto">{n.type==='success' ? 'Success' : 'Error'}</strong>
                    </Toast.Header>
                    <Toast.Body className="text-light">{n.message}</Toast.Body>
                </Toast>
            )}
        </ToastContainer>
    )
}

export default NotificationList