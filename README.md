# Distance and Tips Dashboard

## Introduction
The Distance and Tips Dashboard visualizes the relationship between the distance of taxi trips and the tips given by passengers. This tool helps uncover trends and insights into how the length of a trip might affect tipping behavior.

## Getting Started

### Installation
To install and run the dashboard on your local machine, execute the following steps:

```bash
git clone https://github.com/Lecsar/birdWidget.git
cd birdWidget
npm install
npm start
```

### Accessing the Application

After starting the application, you can access the dashboard in your web browser through either of the following URLs:

-   For local access: `http://localhost:3000`
-   On your local network: `http://192.168.18.118:3000` (Please note that the IP address may vary based on your network configuration. Check your terminal output or network settings to confirm the correct IP address.)

## Deep Linking

The application supports deep linking, enabling users to share specific states of the dashboard, including selected filters. This feature ensures that a user can send a link to another user, which, when opened, will present the dashboard in the exact state as it was shared.

## Running Tests

To run the tests and verify the application's functionalities, use the following command:

```bash
npm test 
```

This will execute the test suites associated with the application, and you will be able to see the test results in your terminal.