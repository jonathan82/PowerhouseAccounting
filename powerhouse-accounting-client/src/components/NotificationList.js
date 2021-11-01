import { useEffect, useState } from "react"
import { ToastContainer, Toast } from "react-bootstrap"
import randomstring from 'randomstring'

const NotificationList = ({ connection }) => {
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        connection.on('NotifySuccess', (message) => {
            setNotifications(nn => [...nn, {type: 'success', message, key: randomstring.generate()}]) 
        })
        connection.on('NotifyError', (message) => {
            setNotifications(nn => [...nn, {type: 'danger', message, key: randomstring.generate()}])
        })
    }, [connection])

    const handleClose = (key) => {        
        setNotifications(notifications.filter((x) => x.key !== key))
    }

    return (
        <ToastContainer position="top-center" className="position-fixed p-3">
            {notifications.map((n) =>
                <Toast bg={n.type} autohide onClose={() => handleClose(n.key)} key={n.key} animation>
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