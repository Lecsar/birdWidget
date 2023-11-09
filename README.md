# Distance and Tips Dashboard

https://github.com/Lecsar/birdWidget/assets/32493146/642bc252-7cc0-4af3-b6c3-b105e98d9fd2

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

- For local access: `http://localhost:3000`
- On your local network: `http://192.168.18.118:3000` (Please note that the IP address may vary based on your network configuration. Check your terminal output or network settings to confirm the correct IP address.)

## Switching Between Real API Data and Fake Data

By default, the application uses fake data to allow for quick and offline development and testing. If you wish to use real data from the API endpoint, follow these steps:

1. Open the developer console in your browser. You can usually do this by right-clicking on the page and selecting "Inspect" or by pressing `F12` or `Ctrl+Shift+I` on your keyboard.

2. In the console, enter the following command to switch to real API data:

   ```javascript
   localStorage.setItem("useRealApi", true);
   ```

3. Refresh the page to see the changes and start using real data from the API.

To revert back to using fake data:

1.  Open the developer console in your browser.
2.  Enter the following command to switch back to fake data:

    `localStorage.setItem('useRealApi', false);`

3.  Refresh the page, and the application will now use the fake data again.

This feature is particularly useful for testing purposes or when the real API endpoint is not available or undergoing maintenance.

## Deep Linking

The application supports deep linking, enabling users to share specific states of the dashboard, including selected filters. This feature ensures that a user can send a link to another user, which, when opened, will present the dashboard in the exact state as it was shared.

## Running Tests

To run the tests and verify the application's functionalities, use the following command:

```bash
npm test
```

This will execute the test suites associated with the application, and you will be able to see the test results in your terminal.
