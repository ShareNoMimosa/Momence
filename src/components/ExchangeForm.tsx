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

import React, { ChangeEvent, FormEvent, ReactElement } from 'react';
import { FormattedExchangeData } from './Exchange';

type Props = {
    data: FormattedExchangeData | null
};

export default function ExchangeForm({ data }: Props): ReactElement | null {
    const [selectedCurrencyIndex, setSelectedCurrencyIndex] = React.useState<number>(0);
    const [convertAmountInput, setConvertAmountInput] = React.useState<string>("");
    const [resultStr, setResultStr] = React.useState<string>('');

    const selectorOptions = getSelectorOptions(data);

    const onSelectChange = function (event: ChangeEvent<HTMLSelectElement>) {
        setSelectedCurrencyIndex(parseInt(event.target.value));
    }
    const onInputChange = function (event: ChangeEvent<HTMLInputElement>) {
        setConvertAmountInput(event.target.value);
    };
    
    const onFormSubmit = function (event: FormEvent<HTMLFormElement>) {        
        event.preventDefault();

        const targetCurrency = data?.currencies[selectedCurrencyIndex];
        const amountToConvert = parseFloat(convertAmountInput);

        if (targetCurrency == null || isNaN(amountToConvert)) {
            return;
        }

        const targetCurrencyAmount = targetCurrency.get('amount') as number;
        const targetCurrencyRate = targetCurrency.get('rate') as number;

        const resultAmount = amountToConvert * targetCurrencyAmount / targetCurrencyRate;

        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: targetCurrency.get('code') as string,
          });

        setResultStr(formatter.format(resultAmount));
    }

    return <div className='ExchangeForm'>
          <form onSubmit={onFormSubmit}>

        <div>
            {"Convert CZK to"}
            <select
                className='CurrencySelector'
                name='currencySelector'
                value={selectedCurrencyIndex}
                onChange={onSelectChange}
            >
                {selectorOptions}
            </select>
        </div>
        <input
            className='CurrencyCalculateInput'
            name='amountInput'
            type="number"
            placeholder='Enter amount to convert'
            value={convertAmountInput}
            onChange={onInputChange}
        />
        <button
            className='CurrencyCalculateButton'
            disabled={convertAmountInput == ""}
            type='submit'
        >
            Calculate
        </button>
        <div>Result: {resultStr}</div>
        </form>
    </div>;
}

function getSelectorOptions(data: FormattedExchangeData | null): Array<ReactElement> {
    if (data == null) {
        return [];
    }

    const selectorOptions: Array<ReactElement> = [];

    for (let i = 0; i < data.currencies.length; i++) {
        const currencyCode = data.currencies[i].get('code');
        selectorOptions.push(
            <option className='CurrencySelectorOption' key={'selector-' + currencyCode} value={i}>
                {currencyCode}
            </option>
        );
    }

    return selectorOptions;
}