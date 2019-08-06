import React from 'react';
import '../App.css';
/*
export default class AddEditWorkout extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            workout: {...this.props.item},
            asEdit: !!this.props.item.date
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleAddSet = this.handleAddSet.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        debugger;
        return {
            workout: {...props.item},
            asEdit: !!props.item.date
        };
    }

    handleAddSet(item, asEdit){
        this.props.handleAddSet(item, asEdit);
    } 

    handleChange(e){
        
        e.preventDefault();
        this.setState({
            workout:{
                ...this.state.workout, [e.target.name]: e.target.value
            }
        });

    }

    

    componentWillMount(){
        console.log('First this called');
    }

    componentDidMount(){
        console.log('componentDidMount');
    }

    render(){
        
        return (
            <form className="add-form" onSubmit={(e) => {e.preventDefault()}}>
                <div>
                <label htmlFor="date">Date</label>
                    <input id="date" name="date" type="text" value={this.state.workout.date} onChange={this.handleChange}/>
                </div>
                <div>
                    <label htmlFor="distance">Distance</label>
                    <input id="distance" name="distance" type="number" value={this.state.workout.distance} onChange={this.handleChange} />
                    
                </div>
                <div>
                    <button onClick={(e) => {
                        e.preventDefault();
                        this.handleAddSet(this.state.workout, !!this.state.workout.date);
                    }}>{this.state.asEdit ? "Edit" : "Add"}</button>
                    {
                        this.state.asEdit && (<button onClick={(e) => {
                            e.preventDefault();
                            this.handleAddSet(this.state.workout, !!this.state.workout.date);
                        }}>Cancel</button>)
                    }
                </div>
            </form>
            
    
        );
    }

};
*/
export function AddEditWorkout(props){

    const {handleAddSet, item} = props;

    function initItem(item){
        return Object.assign({
                date: '',
                distance: '',
                isEdit: false,
            },{
                ...item,
                isEdit: !!item.date,
            }
        );
    }

    const [workout, setWorkout] = React.useState(
        initItem(item)
    );
    
    
    React.useEffect(() => {
        setWorkout(initItem(item));
    },  [item])
    


    const handleChangeDate = (e) => {
        e.preventDefault();
        setWorkout(
            {...workout, date: e.target.value}
        );
    };

    const handleChangeDistance = (e) => {
        e.preventDefault();
        setWorkout(
            {...workout, distance: parseInt(e.target.value || '0')}
        );
    };

    return (
        <form className="add-form" onSubmit={(e) => {e.preventDefault()}}>
            <div>
            <label htmlFor="date">Date</label>
                <input id="date" type="date" value={workout.date} onChange={handleChangeDate}/>
            </div>
            <div>
                <label htmlFor="distance">Distance</label>
                <input id="distance" type="number" value={workout.distance} onChange={handleChangeDistance} />
                
            </div>
            <div>
                <button onClick={(e) => {
                    e.preventDefault();
                    handleAddSet(workout, workout.isEdit);
                }}>{workout.isEdit ? "Edit" : "Add"}</button>
                {
                    workout.isEdit && (<button onClick={(e) => {
                        e.preventDefault();
                        handleAddSet(item, workout.isEdit);
                    }}>Cancel</button>)
                }
            </div>
        </form>
        

    );
}