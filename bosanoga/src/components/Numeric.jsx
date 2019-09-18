import React from 'react';
import Numeral from 'numeral';

Numeral.register('locale', 'bosanoga', {
    delimiters: {
        thousands: ' ',
        decimal: '.'
    },
    abbreviations: {
        thousand: 'тыс.',
        million: 'млн.',
        billion: 'млрд.',
        trillion: 'трлн.'
    },
    currency: {
        symbol: '₽'
    }
});

Numeral.locale('bosanoga');

export default function Numeric(props){

    const {value, format} = props;

    return (
        <>
            {Numeral(value).format(format)}
        </>
    );

}