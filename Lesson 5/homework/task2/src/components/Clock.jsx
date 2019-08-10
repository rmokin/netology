import React from 'react';
import moment from 'moment';
import 'moment/locale/ru';

export default class Clock extends React.Component{

    constructor(props){
        
        super(props);
        this.state = {
            date: moment(this.props.date || new Date()),
            ticks: 0,
            timerId: null,
        };
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleUpdate(){
        
        this.setState({
            ticks: this.state.ticks + 1
        });
    }

    componentDidMount(){
        
        this.setState({
            timerId: setInterval((o) => {o.handleUpdate()}, 1000, this)
        });
    }
    componentWillUnmount(){
        
        clearInterval(this.state.timerId);
        this.setState({
            timerId: null,
        });
    }

    render(){
        
        let mtd = moment(this.state.date);
        mtd.add(this.state.ticks,'seconds');
        return (
            <span className="date-shore">
                {
                    mtd.format(this.props.format || 'YYYY-DD-MM hh:mm:ss')
                }
            </span>
        );

    }
    
}

