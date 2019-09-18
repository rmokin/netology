import React from 'react';
import {TopSales} from './TopSales';
import {Catalog} from './Catalog';


export default function Main(props){

    return (

        
            <div className="row">
                <div className="col">
                    <TopSales />
                    <Catalog />

                </div>
            </div>

    );

}