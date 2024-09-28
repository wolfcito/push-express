#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

function copyFiles(srcDir, destDir) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true })
  }

  fs.readdirSync(srcDir).forEach((file) => {
    const srcFile = path.join(srcDir, file)
    const destFile = path.join(destDir, file)
    if (fs.lstatSync(srcFile).isDirectory()) {
      copyFiles(srcFile, destFile)
    } else {
      fs.copyFileSync(srcFile, destFile)
      console.log(`📂 Created: ${destFile}`)
    }
  })
}

function addNotification(destination) {
  // Copiar la carpeta components/push-notification
  const componentsSrc = path.join(
    __dirname,
    'template',
    'components',
    'push-notification',
  )
  const componentsDest = path.join(
    destination,
    'components',
    'push-notification',
  )
  copyFiles(componentsSrc, componentsDest)

  // Copiar la carpeta service/push-notification
  const serviceSrc = path.join(
    __dirname,
    'template',
    'service',
    'push-notification',
  )
  const serviceDest = path.join(destination, 'service', 'push-notification')
  copyFiles(serviceSrc, serviceDest)

  console.log('\n✨ Notification component and service added successfully!\n')
  console.log('👉 Next Steps:')
  console.log(
    '   1. Run "yarn install" or "npm install" to install dependencies.',
  )
  console.log('   2. Start your project with "npm run dev" or "yarn dev".\n')
}

// Parse command-line arguments
const [, , command, component] = process.argv

// Validate and execute commands
if (command === 'init') {
  console.log('✨ Initializing all components...\n')
  copyAllComponents(process.cwd())
} else if (command === 'add') {
  if (component === 'notification') {
    console.log('✨ Adding notification component...\n')
    addNotification(process.cwd())
  } else {
    console.error(
      '\n❌ Invalid component. Use "add notification" or "add push-channel-suscribe-button".\n',
    )
    process.exit(1) // Exit with a non-zero status code to indicate an error
  }
} else {
  console.error(
    '\n❌ Invalid command. Use "init" or "add notification" or "add push-channel-suscribe-button".\n',
  )
  process.exit(1) // Exit with a non-zero status code to indicate an error
}
