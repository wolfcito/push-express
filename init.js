#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer').createPromptModule()

const copyFiles = (srcDir, destDir) => {
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

const addNotification = (destination, fileType) => {
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
    'src',
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
  const serviceDest = path.join(
    destination,
    'src',
    'service',
    'push-notification',
  )
  copyFiles(serviceSrc, serviceDest)

  console.log(
    `\n✅ Notification component and service added successfully with ${fileType.toUpperCase()}!\n`,
  )

  askPackageManager()
}

const askFileType = (callback) => {
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

const askPackageManager = () => {
  inquirer([
    {
      type: 'list',
      name: 'packageManager',
      message: 'How would you like to install dependencies?',
      choices: [
        { name: 'Yarn', value: 'yarn' },
        { name: 'NPM', value: 'npm' },
        { name: 'Manual', value: 'manual' },
      ],
    },
  ]).then((answers) => {
    const { packageManager } = answers
    if (packageManager === 'yarn') {
      console.log('\n🚀 Installing dependencies using Yarn...')
      console.log('🛠️  yarn add @pushprotocol/restapi@latest ethers@^5.7\n')
      require('child_process').execSync(
        'yarn add @pushprotocol/restapi@latest ethers@^5.7',
        { stdio: 'inherit' },
      )
    } else if (packageManager === 'npm') {
      console.log('\n🚀 Installing dependencies using NPM...')
      console.log('🛠️  npm install @pushprotocol/restapi@latest ethers@^5.7\n')
      require('child_process').execSync(
        'npm install @pushprotocol/restapi@latest ethers@^5.7',
        { stdio: 'inherit' },
      )
    } else {
      console.log(
        '\n🛠️  Manual installation selected. Run the following command to install dependencies:',
      )
      console.log('npm install @pushprotocol/restapi@latest ethers@^5.7')
    }
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
    console.error('\n❌ Invalid component. Use "add notification".\n')
    process.exit(1)
  }
} else {
  console.error('\n❌ Invalid command. Use "init" or "add notification".\n')
  process.exit(1)
}
