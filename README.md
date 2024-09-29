# Push Express 🚀🔔

**Push Express** is a tool that simplifies the integration of push notification components in web projects. It allows you to quickly add notification components and services using TypeScript or JavaScript, with support for Yarn and NPM.

## Features

- Adds push notification components with a single command.
- Supports both TypeScript and JavaScript.
- Automatically installs dependencies using Yarn, NPM, or manually.
- Easy integration with [Push Protocol](https://push.org/) to manage Web3 notifications.

## Installation (Optional)

To install **Push Express**, follow these steps:

### Install using npm

```bash
npm install -g push-express
```

### Install using Yarn

```bash
yarn global add push-express
```

## Usage

Once installed, you can use **Push Express** in your project to add push notification components.

### 1. Add a notification component

Run the following command to add a notification component:

```bash
npx push-express add notification
```

or

```bash
push-express add notification
```

### 2. Select the file type

After running the previous command, select the file type for your project:

- **TypeScript** (default)
- **JavaScript**

### 3. Install dependencies

After adding the notification component, **Push Express** will ask how you want to install dependencies:

- **Yarn**: Automatically installs dependencies using Yarn.
- **NPM**: Automatically installs dependencies using NPM.
- **Manual**: It will show you the command to install them manually.

```bash
npm install @pushprotocol/restapi@latest ethers@^5.7
```

### 4. Start your project

Once the component has been added and the dependencies are installed, you can start your project:

```bash
npm run dev
```

or

```bash
yarn dev
```

## Example

Here’s an example of what your project structure might look like after adding the component:

```bash
src/
├── components/
│   └── push-notification/
│       ├── index.ts
│       └── push-notification.tsx
└── service/
    └── push-notification/
        ├── index.ts
        └── push-notification.service.ts
```

## Contributions

Contributions are welcome! If you want to contribute to **Push Express**, follow these steps:

1. Fork the project [https://github.com/wolfcito/push-express](https://github.com/wolfcito/push-express).
2. Create a branch for your feature (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT license. For more information, check the [LICENSE](LICENSE) file.
