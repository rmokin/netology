import React,{useState} from 'react';
import {AddEditWorkout} from './components/AddEditWorkout';
import {Workouts} from './components/Workouts';
import './App.css';

function App() {

  const [state, setState] = useState({
    workouts:{},
    workout: {},
  });

  const handleAddEditWorkout = (workout, asEdit) => {
    
    const w = state.workouts[workout.date];

    setState({
      ...state,
      workout:{},  
      workouts: {
        ...state.workouts, [workout.date]: {
          ...workout, distance: asEdit ? workout.distance : workout.distance + ( (w && w.distance) || 0)
        } 
      }
    });
  };

  const handleDelete = (date) => {
    
    setState({
      ...state, workouts: Object.assign({}, state.workouts, {[date]: undefined}) 
    });
  };

  const handleEdit = (date) => {
    setState({
      ...state, workout: state.workouts[date]
    });
  };

  return (
    <div>
      <AddEditWorkout handleAddSet={handleAddEditWorkout} item={state.workout} handleEdit={handleEdit} />
      <br/>
      <Workouts workouts={state.workouts} handleDelete={handleDelete} handleEdit={handleEdit} />
    </div>
  );
}

export default App;
