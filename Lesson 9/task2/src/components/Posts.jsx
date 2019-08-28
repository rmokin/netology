import React from 'react';
import moment from 'moment';

function DateTime(props) {

    const {date} = props;

    const printDate = (date) => {

        let datePretty = (diff, text) => {
            const df = Math.floor(diff);
            return df > 0 ? `${df} ${text}` : ''
        };

        let diff = (date) => moment.duration(moment().diff(date));

        return  datePretty(diff(date).asDays(), "days ago") || 
                datePretty(diff(date).asHours(), "hours ago") ||
                datePretty(diff(date).asMinutes(), "minutes ago" ) ||
                datePretty(diff(date).asSeconds(), "seconds ago");
    }

    return (date) && (
        <>
        {
            (date) && printDate(date)
        }
        </>
    )
}

export function Post(props){

    const {id, date, content, handleDelete} = props;

    return (
        <div className="post">
            <div className="id small">
                <a href={`/post/${id}`}>{id}</a>
            </div>
            <div className="date small">
                <DateTime date={date} />
            </div>
            <p className="post-content">{content}</p>
            <div className="post-footer">
                <div className="buttons-container">
                    <a href={`/post/${id}/edit`}>Edit</a>
                    <a className="link-button" href={false} onClick={ (e) => { e.preventDefault(); handleDelete(id);} }>Del</a>
                </div>
            </div>
        </div>
    );
}

export function Posts(props){

    const {posts, handleDelete} = props;

    return (
        <div className="posts-container">
            {
                posts.map((item) => {
                    return (
                        <Post key={item.id} {...item} handleDelete={handleDelete} />
                    );
                })
            }
        </div>
        
    );

}

export function AddEditPost(props){

    const {handleChange, id = '', text} = props;
    const [content, setContent] = React.useState('');

    React.useEffect( () => {
        setContent(text);

        return () => {};
    }, [text] );

    return (
        <div className="post-add">
            <a className="link-cancel" href="/">Х</a>
            <h3>
                {
                   ((id) && 'Edit') || 'Add' 
                }
                &nbsp;post
            </h3>
            
            <textarea rows={5} cols={28} value={content} onChange={(e) => { e.preventDefault(); setContent(e.target.value);} }></textarea>
            <br/>
            
            <button onClick={ (e) => {e.preventDefault(); handleChange(id, content); setContent(''); }}>
                { ((id) && 'Edit') || 'Add' }
            </button>
        </div>
    );

}