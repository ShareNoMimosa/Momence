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
import { FormattedExchangeData } from './Exchange';

type Props = {
    data: FormattedExchangeData | null
}

export default function ExchangeTable({ data }: Props): ReactElement | null {
    return data == null ? null : createTable(data);
}

function createTable(formattedData: FormattedExchangeData): ReactElement {
    const headers = formattedData.headers.map(header => {
        return <th className='ExchangeTableHeader' key={header}>{header}</th>
    });

    const currencyRows = [];
    for (let i = 0; i < formattedData.currencies.length; i++) {
        const currencyData: Array<ReactElement> = [];
        formattedData.currencies[i].forEach(
            (currencyDataValue, currencyDataKey) =>
                currencyData.push(
                    <td className='CurrencyData' key={currencyDataKey + '-' + i}>
                        {currencyDataValue}
                    </td>
                )
        );
        currencyRows.push(
            <tr className='CurrencyRow' key={'currencyRow-' + i}>
                {currencyData}
            </tr>
        );
    }

    return <div className='ExchangeTable'>
        {formattedData.date && <div className='ExchangeDate'>
            {'Exchange data as of ' + formattedData.date.toLocaleDateString()}
        </div>}
        <table>
            <thead>
                <tr>
                    {headers}
                </tr>
            </thead>
            <tbody>
                {currencyRows}
            </tbody>
        </table>
    </div>;
}