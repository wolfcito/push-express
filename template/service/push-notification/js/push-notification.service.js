import { PushAPI, CONSTANTS } from '@pushprotocol/restapi'
import { Wallet } from 'ethers'

// Push channel address
const PUSH_CHANNEL_ADDRESS = '0x2eacd83edE279093A55353056E09fFe0824C299b'
const PK_SIGNER =
  process.env.DEPLOYER_PRIVATE_KEY ??
  'abd1788625aa80c8a0aebba811880966dab3f9fafaa0eece8c449868dce64759'

export const sendNotification = async (
  walletAddress,
  title = 'You awesome notification',
  body = 'from your amazing protocol',
) => {
  // ⚠️  Warning: Never commit your real private key to the repository.
  // The one provided below is just an example. Always use environment variables for sensitive data.
  const notificationSigner = new Wallet(PK_SIGNER)

  // Initialize wallet user
  // 'CONSTANTS.ENV.PROD' -> mainnet apps | 'CONSTANTS.ENV.STAGING' -> testnet apps
  const userAlice = await PushAPI.initialize(notificationSigner, {
    env: CONSTANTS.ENV.STAGING,
  })

  // List inbox notifications
  const inboxNotifications = await userAlice.notification.list('INBOX')

  // List spam notifications
  const spamNotifications = await userAlice.notification.list('SPAM')

  console.log('inboxNotifications:', inboxNotifications)
  console.log('spamNotifications:', spamNotifications)
  // Subscribe to push channel
  await userAlice.notification.subscribe(
    `eip155:11155111:${PUSH_CHANNEL_ADDRESS}`, // channel address in CAIP format
  )

  // Send notification, provided userAlice has a channel
  const response = await userAlice.channel.send([walletAddress], {
    notification: {
      title,
      body,
    },
  })

  console.log('response:', response)
  // To listen to real time notifications
  const stream = await userAlice.initStream([CONSTANTS.STREAM.NOTIF])

  // Set stream event handling
  stream.on(CONSTANTS.STREAM.NOTIF, (data) => {
    console.log('Real-time notification:', data)
  })

  // Connect to stream
  stream.connect()
}
