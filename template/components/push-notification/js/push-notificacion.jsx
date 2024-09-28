import { useEffect } from 'react'
import { initializeUser } from '../services/pushNotificationService'

const PushNotificationComponent = () => {
  useEffect(() => {
    initializeUser()
  }, [])

  return <div>Push Notification Initialized!</div>
}

export default PushNotificationComponent
