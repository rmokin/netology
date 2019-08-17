import React from 'react';
import '../App.css';

export default class AddForm extends React.Component{

    constructor(props){
        super(props);
        this.state = this.initialState();
    }

    initialState = (e) =>{
        return {
            clockName:"",
            timeZone:"", 
            canAdd:true,
        };
    }

    handleChange = (e) => {
        let data = {
            ...this.state,
            [e.target.name]: e.target.value,
        }
        data["canAdd"] = this.props.handleIsUnique(data);
        this.setState(data);
    };

    render(){
        return (
            <form onSubmit={(e) => {e.preventDefault()}}>
                <div className="form-control-inline">
                    <label htmlFor="clockName">Caption</label>
                    <input id="clockName" name="clockName" type="text" value={this.state.clockName} onChange={this.handleChange} />
                    
                </div>
                <div className="form-control-inline">
                <label htmlFor="timeZone">Timezone</label>
                    <input id="timeZone" name="timeZone" type="number" value={this.state.timeZone} onChange={this.handleChange} />
                    
                </div>
                <div className="form-control-inline">
                    <button 
                        name="add" 
                        disabled={!this.state.canAdd} 
                        onClick={(e)=>{
                            e.preventDefault();
                            this.setState(this.initialState());
                            this.props.handleAdd({
                                clockName: this.state.clockName,
                                timeZone: this.state.timeZone,
                            })
                    }}>Add</button>
                </div>
            </form>
        );
    }

}