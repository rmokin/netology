import React from 'react';
import Section from './Section';


export default function About(props){

    return (
        <Section {...props} className="about" template={import('../assets/html/About.html')} />
    );

}