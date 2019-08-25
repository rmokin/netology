import React from 'react';

export function News(props){

    const {news} = props;    

    return (
        <div className="news-list">
            {

                news.map( (item) => {
                    return (
                        <div key={item.id} className="new">
                            <img src={item.image} />
                            <h3>{item.title}</h3>
                            <p>{item.content}</p>
                        </div>
                    );
                })

            }
        </div>
    );

} 