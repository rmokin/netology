import React from 'react';
import moment from 'moment';
import '../App.css';
import { setInterval } from 'timers';

export default class ClockContainer extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            timerId: 0,
            ticks: 0,
        };
    }

    componentDidMount(){
        this.setState({
            timerId: setInterval((o) => {
                o.setState({
                    ticks: o.ticks + 1
                })
            }, 1000, this)
        });
    }

    componentWillUnmount(){
        clearInterval(this.state.timerId);
    }

    render(){
        return (
            this.props.clocks.map((item, index) => {
                return (
                    <Clock 
                        key={index} 
                        clock={item} 
                        ticks={this.state.ticks}
                        handleDelete={(e) => {
                            e.preventDefault();
                            this.props.handleDelete(index);
                        }} 
                    />
                );
            })
        );
    }
} 

export function Clock(props){

    const {clock,handleDelete} = props;
    let mdt = moment();
    mdt.add(clock.timeZone,'hours');

    const hours = ((mdt.hour() + 11) % 12 + 1);
    const minutes = mdt.minute();
    const seconds = mdt.second();
  
    const hour = hours * 30;
    const minute = minutes * 6;
    const second = seconds * 6;

    return (
        <div className="clock-container">
            <button className="clock-btn-delete" onClick={handleDelete}>X</button>
            <h3 className="clock-name">
                {clock.clockName}
                <span className="small">({(clock.timeZone > 0 ? "+" : "") + clock.timeZone})</span>
            </h3>
            
            <div className="oclock-container">
                {
                    mdt.format("hh:mm:ss")
                }
            </div>
            <div className="clock">
                <div className="wrap">
                    <span className="hour" style={{transform:`rotate(${hour}deg)`}}></span>
                    <span className="minute" style={{transform:`rotate(${minute}deg)`}}></span>
                    <span className="second" style={{transform:`rotate(${second}deg)`}}></span>
                    <span className="dot"></span>
                </div>
            </div>
        </div>
    );

}