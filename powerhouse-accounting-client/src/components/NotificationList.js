import { useEffect, useState } from "react"
import { ToastContainer, Toast } from "react-bootstrap"

const NotificationList = ({ connection }) => {
    const [notifications, setNotifications] = useState([])
    
    useEffect(() => {
        const addMessage = (type, message) => {
            setNotifications([...notifications, {type, message}])
        }
        connection.on('NotifySuccess', (message) => {
            addMessage('success', message)         
        })
        connection.on('NotifyError', (message) => {
            addMessage('danger', message)
        })
    }, [])

    const handleClose = (index) => {
        const newNots = [...notifications]
        newNots.splice(index,1)
        setNotifications(newNots)
    }

    return (
        <ToastContainer position="top-center" className="position-fixed p-3">
            {notifications.map((n,index) =>
                <Toast bg={n.type} autohide onClose={() => handleClose(index)} key={index}>
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