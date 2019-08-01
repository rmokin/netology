import React from 'react';
import '../main.css';

export default class Item extends React.Component{
    constructor(props){
        super(props);
    }
    
    
    render () {
        return (
            <div className="item">
                    <div className="item-image">
                        <a href={this.props.url}>
                            <img src={this.props.MainImage.url_570xN} atl={this.props.title} />
                        </a>
                    </div>
                    <div className="item-details">
                        <p className="item-title">
                            {
                                this.props.title.length < 50 
                                ? this.props.title
                                : this.props.title.substring(50) + "..."
                            }
                        </p>
                        <p className="item-price">
                            {
                                this.props.currency_code === "USD" 
                                ? "$" + this.props.price.toString()
                                : this.props.currency_code === "EUR" 
                                    ? "€" + this.props.price.toString()
                                    : this.props.price.toString() + " " + this.props.currency_code
                            }
                        </p>
                        <p 
                            className={
                                "item-quantity level-" + 
                                (
                                    this.props.quantity < 10 
                                    ? "low"
                                    : this.props.quantity < 20 
                                        ? "medium"
                                        : "high" 
                                )
                            }>
                            {this.props.quantity}&nbsp;left
                        </p>
                    </div>
                </div>
        );
    }
    
}

Item.defaultProps = {
    url: "",
    MainImage: {
        url_570xN: '',
    },
    title: "",
    currency_code:"",
    price: 0.0,
    quantity: 0,
}
