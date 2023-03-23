# Requirements
Create a simple app, in the following stack: React (+ Hooks), TypeScript, Styled Components, React Query, which:
1. When it starts, retrieves the latest currency exchange rates from the Czech National Bank.
   * API URL: https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt
   *    Documentation: https://www.cnb.cz/en/faq/Format-of-the-foreign-exchange-market-rates/
2. Parses the downloaded data and clearly displays it to the user in the UI.
3. Add a simple form, into which the customer can enter an amount in CZK and select a currency, and after clicking a button sees the amount entered in CZK converted into the selected currency.
4. Commit your code throughout your work and upload the resulting codebase into a Github repo.
5.  Overall: Keep the code simple and the UI nice and easy to use for the user.

# Implementation
Custom components are in `/src/components` directory.
Base app file: `/src/App.tsx`
CSS styling: `/src/App.css`

Note:
As commented in `/src/components/Exchange.tsx`, normal fetch call to the API URL will actually run into CORS error because cnb server returns `Access-Control-Allow-Origin: apl.cnb.cz` header while we're running our react app on `localhost:3000`. For this exercise I bypassed CORS locally with a browser extension (Allow CORS: Access-Control-Allow-Origin). A more practical solution would be standing up our own server to route request and return an
`Access-Control-Allow-Origin: *` header instead which was out of scope.

# Demo

https://user-images.githubusercontent.com/8609540/227068168-f03cdf6d-2d54-4941-a9cf-bcf34dda9720.mp4



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
