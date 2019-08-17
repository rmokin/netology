import React from 'react';
import AddForm from './components/AddForm';
import ClockContainer from './components/Clock';
import './App.css';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state={
      clocks: [],
    };
  }

  handleIsUnique = (clock) => {
    return (
      this.state.clocks.filter(
        (item) => { 
          return item.clockName === clock.clockName || item.timeZone === clock.timeZone 
      }).length === 0
    );
  }

  handleAdd = (clock) => {
    (
      clock.clockName && 
      this.handleIsUnique(clock)  
    ) && this.setState({
      clocks: [
        ...this.state.clocks,
        clock
      ]
    });
  };

  handleDelete = (index) => {
    this.setState({
      clocks: this.state.clocks.filter( (item, i) => { return i !== index })
    });
  };

  render () {
    return (
      <div className="App">
        <AddForm handleAdd={this.handleAdd} handleIsUnique={this.handleIsUnique} />
        <br/>
        <ClockContainer clocks={this.state.clocks} handleDelete={this.handleDelete} />
      </div>
    );
  };
}

export default App;
