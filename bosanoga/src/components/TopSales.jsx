import React from 'react';



import {fetchTopSalesThunk } from '../actions/actionCreators';
import {Store} from './Store';




export function TopSales(props){

    return (
        
        (
            <section className="top-sales">
                <h2 className="text-center">Хиты продаж!</h2>
                <Store dispatcher={fetchTopSalesThunk} reducers={['topsales']} />
            </section>
        )
    );

}



