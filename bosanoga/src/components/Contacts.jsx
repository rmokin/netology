import React from 'react';
import Section from './Section';

export default function Contacts(props){

    return (
        <Section {...props} className="contacts" template={import('../assets/html/Contacts.html')} />
    );

}