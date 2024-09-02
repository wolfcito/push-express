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

function copyAllComponents(destination) {
  const templateDir = path.join(__dirname, 'template', 'components')
  copyFiles(templateDir, path.join(destination, 'components'))
}

function addNotificationComponent(destination) {
  const templateDir = path.join(
    __dirname,
    'template',
    'components',
    'push-notification'
  )
  const destDir = path.join(destination, 'components', 'push-notification')
  copyFiles(templateDir, destDir)
}

// Parse command-line arguments
const [, , command, component] = process.argv

// Validate and execute commands
if (command === 'init') {
  console.log('Initializing all components...')
  copyAllComponents(process.cwd())
} else if (command === 'add' && component === 'notification') {
  console.log('Adding notification component...')
  addNotificationComponent(process.cwd())
} else {
  console.error(
    'Invalid command. Use "init" to initialize all components or "add notification" to add the notification component.'
  )
  process.exit(1) // Exit with a non-zero status code to indicate an error
}
