import React from "react";
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import About from './components/About';
import Contacts from './components/Contacts';
import Ordered from './components/Ordered';
import {Cart} from './components/Cart';
import {Product} from './components/Product';
import {Catalog} from './components/Catalog';

import _404_ from './components/404';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; 


import './App.css';
import './assets/css/style.css';


function App() {
    return (
      <>
        <Router >
        <Header />
        <main className="container">
            <Switch>
                <Route path="/about" component={About} />
                <Route path="/contacts" component={Contacts} />
                <Route path="/cart" component={Cart} />
                <Route path="/catalog/:productId" component={Product} />
                <Route path="/catalog" component={Catalog} />
                <Route path="/ordered" component={Ordered} />
                <Route path="/" exact component={Main} />
                <Route component={_404_} />
            </Switch>
        </main>
        <Footer />
        </Router>
      </>
    );
  }
  
  export default App;


/*
import Page from './html/test.html';
var htmlDoc = {__html: Page};
*/
/*
class App extends Component {
    render() {

        return (
            <Section className="top-sales" template={import('./html/test.html')} />
        );
    }
}

export default App;
*/