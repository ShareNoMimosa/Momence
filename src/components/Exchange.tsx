/**
 * Create a simple app, in the following stack: React (+ Hooks), TypeScript, Styled Components, React Query, which:
 * 
 * 1. When it starts, retrieves the latest currency exchange rates from the Czech National Bank.
 *    API URL: https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt
 *    Documentation: https://www.cnb.cz/en/faq/Format-of-the-foreign-exchange-market-rates/
 * 2. Parses the downloaded data and clearly displays it to the user in the UI.
 * 3. Add a simple form, into which the customer can enter an amount in CZK and select a currency, and after clicking a button sees the amount entered in CZK converted into the selected currency.
 * 4. Commit your code throughout your work and upload the resulting codebase into a Github repo.
 * 5.  Overall: Keep the code simple and the UI nice and easy to use for the user.
 */

import React from 'react';

export default function Exchange() {
    React.useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt');
            console.log('response', response);

            const responseText = await response.text();

            console.log(responseText, response.body);
        };

        fetchData();
        console.log('test');
    }, []);

    return (
        <div>Test</div>
    );
}