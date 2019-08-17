import React from 'react';
import moment from 'moment';

export function Note(props){

    return (
        <div className="note">
            <button 
                className="note-btn-delete" 
                onClick={ (e) => { 
                e.preventDefault(); 
                props.handleDelete(props.id); 
            }}>X</button>
            <p className="note-content">{props.content}</p>
            <div className="small">
                {
                    (props.date && moment( props.date).format("DD.MM.YYYY hh:mm:ss")) || ''
                }
            </div>
        </div>
    );
}

export function Notes(props){

    return (
        <div className="note-container">
            {
                props.items.map((item) => {
                    return (
                        <Note key={item.id} {...item} handleDelete={props.handleDelete} />
                    );
                })
            }
        </div>
        
    );

}

export function AddNote(props){

    const [content, setContent] = React.useState('');

    return (
        <div className="note-add">
            <textarea rows={5} cols={28} value={content} onChange={(e) => { e.preventDefault(); setContent(e.target.value);} }></textarea>
            <br/>
            <button onClick={ (e) => {e.preventDefault(); props.handleAdd(content); setContent(''); }}>Add</button>
        </div>
    );

}