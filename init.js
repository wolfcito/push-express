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
      console.log(`Created: ${destFile}`)
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

  console.log(`Notification component and service added successfully.`)
  console.log(
    'Please run "yarn install" or "npm install" to update dependencies.',
  )
}

// Parse command-line arguments
const [, , command, component] = process.argv

// Validate and execute commands
if (command === 'init') {
  console.log('Initializing all components...')
  copyAllComponents(process.cwd())
} else if (command === 'add') {
  if (component === 'notification') {
    console.log(`Adding ${component} component...`)
    addNotification(process.cwd())
  } else {
    console.error(
      'Invalid component. Use "add notification" or "add push-channel-suscribe-button".',
    )
    process.exit(1) // Exit with a non-zero status code to indicate an error
  }
} else {
  console.error(
    'Invalid command. Use "init" to initialize all components or "add notification" or "add push-channel-suscribe-button" to add a specific component.',
  )
  process.exit(1) // Exit with a non-zero status code to indicate an error
}
