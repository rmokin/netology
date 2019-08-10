
import React from 'react';
import '../App.css';

export function Card(props){

    return (
        <div className="card">
            {
                (props.image) && (
                    <img src={props.image} class="card-img-top" alt={props.image} />
                )
            }
            <div class="card-body">
                {props.children}
            </div>
        </div>
    );

}

export function CardBody(props){

    return (

        <div class="card-body">
            <h5 class="card-title">{props.title}</h5>
            <p class="card-text">{props.text}</p>
            {
                (props.hrefLink) && (
                    <a href={props.hrefLink || '#'} class="btn btn-primary">{props.textLink}</a>
                )
            }
        </div>

    );

}