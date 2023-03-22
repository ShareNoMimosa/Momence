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

import React, { ReactElement } from 'react';
import ExchangeForm from './ExchangeForm';
import ExchangeTable from './ExchangeTable';

/**
 * Currency exchange data format: https://www.cnb.cz/en/faq/Format-of-the-foreign-exchange-market-rates/
 */
type CurrencyData = Map<string, string | number>;
export type FormattedExchangeData = { date: Date | null, headers: Array<string>, currencies: Array<CurrencyData> };

export default function Exchange(): ReactElement {
    const [exchangeData, setExchangeData] = React.useState<FormattedExchangeData | null>(null);

    React.useEffect(() => {
        const fetchData = async () => {
            /**
             * Actually will run into CORS error because cnb server returns
             * 'Access-Control-Allow-Origin: apl.cnb.cz' header while we're
             * running our react app on localhost:3000.
             * 
             * For this exercise bypassing CORS locally with a browser
             * extension. A more practical solution would be standing up our
             * own server to route request and return an
             * 'Access-Control-Allow-Origin', '*' header instead. */
            const response = await fetch('https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt');

            const responseText = await response.text();
            const formattedData = formatExchangeData(responseText);

            setExchangeData(formattedData);
        };

        fetchData();
    }, []);

    return <div className='Exchange'>
        <ExchangeTable data={exchangeData} />
        <ExchangeForm data={exchangeData} />
    </div>;
}

function formatExchangeData(data: string): FormattedExchangeData | null {
    const rows = data.split('\n');
    if (rows.length < 3) {
        // invalid exchange data
        return null;
    }

    const formattedData: FormattedExchangeData = {
        date: null,
        headers: [],
        currencies: [],
    };

    const dateRow = Date.parse(rows.shift()?.split(' #')[0] || '');
    if (!isNaN(dateRow)) {
        formattedData.date = new Date(dateRow);
    }

    const headersRow = rows.shift()?.split('|') || [];
    formattedData.headers = headersRow;

    rows.forEach(row => {
        const rowData = row.split('|');

        if (rowData.length !== 5) {
            return;
        }

        formattedData.currencies.push(
            new Map<string, string | number>([
                ["country", rowData[0]],
                ["currency", rowData[1]],
                ["amount", parseFloat(rowData[2])],
                ["code", rowData[3]],
                ["rate", parseFloat(rowData[4])]
            ]));
    });

    return formattedData;
}