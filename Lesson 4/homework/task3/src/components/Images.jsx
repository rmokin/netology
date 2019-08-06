import React from 'react';

export function Images(props){

    const {images, handleDelete} = props;

    return (
        (images || []).map((item, index) => {
            return (
                <div key={index} className="item-image-container">
                    <button className="item-image-deleter" onClick={(e) => {handleDelete(index)}}>X</button>
                    <div>
                        <img className="item-image-view" src={item} alt={`view num. ${index}`} />
                    </div>
                    
                </div>
            );
        })
    );

}