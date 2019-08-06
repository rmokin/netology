import React from 'react';
import '../App.css';

export function Workouts(props){
    const {workouts, handleDelete, handleEdit} = props;
    
    function sort(workouts,desc){
        let dates = Object.keys(workouts);

        dates.sort((a,b) => {
            return ( 
                ((a > b) && ((desc && (-1)) || 1)) ||
                ((a < b) && ((!desc && (-1)) || 1)) ||
                ( (a === b) && 0 )
            );
        });
        
        let w = [];
        dates.forEach((date) => {
            (workouts[date]) && w.push(workouts[date]);
        });
        return w;
    }
    
    return (
        <div className="list-workouts">
            <div className="list-workouts-header">
                <div className="list-item list-workouts-date">
                    Date
                </div>
                <div className="list-item list-workouts-distance">
                    Distance
                </div>
                <div className="list-item list-workouts-buttons">
                    &nbsp;
                </div>
            </div>
            <div className="list-worouts-items">
                {
                    sort(workouts).map((item,index) => {
                        return (
                            <div key={item.date}>
                                <div className="list-item list-workouts-date">
                                    {item.date}
                                </div>
                                <div className="list-item list-workouts-distance">
                                    {item.distance}
                                </div>
                                <div className="list-item list-workouts-buttons">
                                    <button onClick={ (e) =>{handleEdit(item.date)}}>Edit</button>
                                    <button onClick={ (e) =>{handleDelete(item.date)}}>Delete</button>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
        
        

    );
}