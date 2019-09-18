import React from 'react';
import '../App.css';


export default function Error(props){

    const {
        message, 
        handleRepeate, 
        autoRepeateAfter = 0,
    } = props;
    const [hide, setHide] = React.useState(false);

    const [timer,setTimer] = React.useState(0);
    const [ticks,setTicks] = React.useState(0);
    
    React.useEffect ( () => {
        setHide(false);
        if (autoRepeateAfter && handleRepeate){
            startTimer(1000,autoRepeateAfter);
        }
        return () =>{ close() } ;
    },[]);

    const startTimer = (delay, maxTicks) => {

        if(!timer){
            setTicks( t => 0 );
            setTimer( setInterval(() => { setTicks( (t) => t + 1 )}, delay));
        }
    };

    const stopTimer = () =>{
        clearInterval(timer);
        setTicks( t => 0 );
    };

    const close = ( e ) => {
        e && e.preventDefault(); 
        stopTimer();
        setHide(true);

    };

    const repeate = ( e ) => {

        e && e.preventDefault();
        stopTimer();
        handleRepeate && handleRepeate();

    };

    if (ticks >= autoRepeateAfter){
        repeate();
    }
    
    return (
        <>
        {
            !hide && message && 
            (
                <div className="alert alert-danger alert-dismissible">
                    <a className="close" onClick={ close }>&times;</a>
                    <strong>Ошибка!</strong>&nbsp;{message}
                    {
                        (handleRepeate) && (<button type="button" className="btn btn-danger ml-3" onClick={ repeate }>
                            Повторить{ autoRepeateAfter > 0 && (` (${autoRepeateAfter - ticks} сек.)`) }
                        </button>
                        )    
                    }
                </div>
            )
        }
        </>
    )

}
