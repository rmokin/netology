import React from 'react';

export function New(props){
    const {id, image, title, content, mode} = props;

    return (
        <a href={ (mode !=='view' && `/new/${id}`) || false}>
            <div key={id} className="new">
                <img src={image} alt={title} />
                <h3>{title}</h3>
                <p>{content}</p>
            </div>
        </a>
    );
}

export function News(props){

    const {news} = props;    

    return news && (
        <div className="news-list">
            {

                news.map( (item) => {
                    return (
                        <New {...item}/>
                    );
                })

            }
        </div>
    );

} 