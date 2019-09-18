import React from 'react';
import Section from './Section';

export default function _404_(props){

    return (
        <Section {...props} className="_404_" template={import('../assets/html/404.html')} />
    );

}