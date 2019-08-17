import React from 'react';
import shortid from 'shortid';
import {Notes,AddNote} from './components/Notes';
import {listNotes, addNote, delNote} from './endpoints/Notes';
import './App.css';

class App extends React.Component{
  
  constructor(props){
    super(props);
    this.state = this.initialState();
  }

  initialState = () => {
    return ({
      notes: [],
    });
  };

  listNotesEndpoint = () => {
    listNotes((data)=> {
      this.setState({
        notes: data.notes || []
      });  
    });
  };

  deleteNotesEndpoint = (id) => {
    delNote((data) => {
      this.listNotesEndpoint();
    }, id);
  };

  addNotesEndpoint = (note) => {
    addNote((data)=> {
      this.listNotesEndpoint();  
    }, note);
  };

  handleDelete = (id) => {
    this.deleteNotesEndpoint(id);
  };

  handleAdd = (content) => {
    this.addNotesEndpoint({
      id: shortid.generate(),
      content: content,
    });
  };

  handleUpdateNotes = () => {
    this.listNotesEndpoint();
  };

  componentDidMount(){
    this.listNotesEndpoint();
  }

  render() {
    return (
      <div className="notes-wrapper">
        <h3>
          Notes
          <button className="inline-button" onClick={(e) => { e.preventDefault(); this.handleUpdateNotes(); }}>Refresh</button>
        </h3>
        <Notes items={this.state.notes} handleDelete={this.handleDelete} />
        <br/>
        <AddNote handleAdd={this.handleAdd} />
      </div>
    );
  };

}

export default App;
