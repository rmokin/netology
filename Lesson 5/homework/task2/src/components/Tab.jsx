import React from 'react';
import {NavBar} from '../components/NavBar';
import '../App.css';

class Tab extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            activeIndex: 0,
        };

        this.handleSelectTab = this.handleSelectTab.bind(this);
    }

    handleSelectTab(index){
        
        this.setState({
            activeIndex: index,
        })
    }

    render (){
        
        return (
            <div className="tab">
                <div className="tab-switcher">
                    {
                        <NavBar 
                            items={this.props.children} 
                            className="tab-item-switch" 
                            onClick={this.handleSelectTab}
                            activeIndex={this.state.activeIndex}/>
                    }
                </div>
                <div className="tab-boby">
                    {
                        this.props.children[this.state.activeIndex]
                    }
                </div>
            </div>
        );
    }
}

class TabItem extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        
        return (
            <div className="tab-item">
                {this.props.children}
            </div>
        );
    }
}



export {
    Tab,
    TabItem,
}

