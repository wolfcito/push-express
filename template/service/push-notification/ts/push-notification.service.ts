import { PushAPI, CONSTANTS } from '@pushprotocol/restapi'
import { ethers } from 'ethers'

export const initializeUser = async (walletAddress: string) => {
  const signer = ethers.Wallet.createRandom()

  const userAlice = await PushAPI.initialize(signer, {
    env: CONSTANTS.ENV.STAGING,
  })

  const inboxNotifications = await userAlice.notification.list('INBOX')
  console.log('Inbox Notifications:', inboxNotifications)

  await userAlice.notification.subscribe(`eip155:11155111:${walletAddress}`)

  const response = await userAlice.channel.send(['*'], {
    notification: {
      title: 'You awesome notification',
      body: 'from your amazing protocol',
    },
  })

  console.log('Notification Sent:', response)

  const stream = await userAlice.initStream([CONSTANTS.STREAM.NOTIF])

  stream.on(CONSTANTS.STREAM.NOTIF, (data) => {
    console.log('Real-time notification:', data)
  })

  stream.connect()
}
