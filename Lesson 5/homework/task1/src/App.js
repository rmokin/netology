import React from 'react';
import './App.css';
import {Card, CardBody} from './components/Card'

function App() {
  return (
    <div>
      <Card image="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png">
        <CardBody 
          title="Card title"
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
          textLink="Go somewhere"
          hrefLink="#"/>
      </Card>
      <br />
      <Card >
        <CardBody 
          title="Special title treatment"
          text="With supporting text below as a natural lead-in to additional content."
          textLink="Go somewhere"
          hrefLink="#"/>
      </Card>
    </div>
  );
}

export default App;
