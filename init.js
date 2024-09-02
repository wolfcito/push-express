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

function addComponent(destination, componentName) {
  const templateDir = path.join(
    __dirname,
    'template',
    'components',
    componentName
  )
  const destDir = path.join(destination, 'components', componentName)
  copyFiles(templateDir, destDir)
}

// Parse command-line arguments
const [, , command, component] = process.argv

// Validate and execute commands
if (command === 'init') {
  console.log('Initializing all components...')
  copyAllComponents(process.cwd())
} else if (command === 'add') {
  if (
    component === 'push-notification' ||
    component === 'push-channel-suscribe-button'
  ) {
    console.log(`Adding ${component} component...`)
    addComponent(process.cwd(), component)
  } else {
    console.error(
      'Invalid component. Use "add push-notification" or "add push-channel-suscribe-button".'
    )
    process.exit(1) // Exit with a non-zero status code to indicate an error
  }
} else {
  console.error(
    'Invalid command. Use "init" to initialize all components or "add push-notification" or "add push-channel-suscribe-button" to add a specific component.'
  )
  process.exit(1) // Exit with a non-zero status code to indicate an error
}
