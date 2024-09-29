#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer').createPromptModule()

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

function addNotification(destination, fileType) {
  const ext = fileType === 'ts' ? 'ts' : 'js'

  const componentsSrc = path.join(
    __dirname,
    'template',
    'components',
    'push-notification',
    ext,
  )
  const componentsDest = path.join(
    destination,
    'components',
    'push-notification',
  )
  copyFiles(componentsSrc, componentsDest)

  const serviceSrc = path.join(
    __dirname,
    'template',
    'service',
    'push-notification',
    ext,
  )
  const serviceDest = path.join(destination, 'service', 'push-notification')
  copyFiles(serviceSrc, serviceDest)

  console.log(
    `\n✅ Notification component and service added successfully with ${fileType.toUpperCase()}!\n`,
  )
  console.log('🚀 Next Steps:')
  console.log(
    '   1. Run `npm install @pushprotocol/restapi@latest ethers@^5.7` to install dependencies.',
  )
  console.log('   2. Start your project with `npm run dev` or `yarn dev`.\n')
}

function askFileType(callback) {
  inquirer([
    {
      type: 'list',
      name: 'fileType',
      message: 'Would you like to use JavaScript or TypeScript?',
      choices: [
        { name: 'TypeScript (Default)', value: 'ts' },
        { name: 'JavaScript', value: 'js' },
      ],
      default: 'ts',
    },
  ]).then((answers) => {
    callback(answers.fileType)
  })
}

// Parse command-line arguments
const [, , command, component] = process.argv

if (command === 'init') {
  console.log('✨ Initializing all components...\n')
  copyAllComponents(process.cwd())
} else if (command === 'add') {
  if (component === 'notification') {
    askFileType((fileType) => {
      console.log(
        `\n✨ Adding notification component using ${fileType.toUpperCase()}...\n`,
      )
      addNotification(process.cwd(), fileType)
    })
  } else {
    console.error(
      '\n❌ Invalid component. Use "add notification" or "add chat".\n',
    )
    process.exit(1)
  }
} else {
  console.error(
    '\n❌ Invalid command. Use "init" or "add notification" or "add chat".\n',
  )
  process.exit(1)
}
