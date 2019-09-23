import React from 'react';
import {NavLink} from 'react-router-dom';
import classNames from 'classnames';
import {useDispatch, useSelector} from'react-redux';

import {Cart} from './Cart';
import {Redirect} from 'react-router-dom';
import Search from './Search';

import '../assets/img/header-logo.png';
import '../assets/img/banner.jpg';

export default function Header(props){

    const [search, setSearchValue] = React.useState('');
    const [isShownSearch, setIsShownSearch] = React.useState(false);
    const [isRedirect, setRedirect] = React.useState('');
    const [isNeedUpdateCartVidget, setIsNeedUpdateCartVidget] = React.useState(false);
    const {
        items = {}, 
    } = useSelector(state => state.cart);

    
    
    React.useEffect( () => {
        setRedirect('');
        return () => {};
    },[isRedirect]);
    const searchHandle = (search,shown) => {
        
        setIsShownSearch(!shown);
        if (search && shown){
            
            setRedirect('/catalog');
        }
    }


    return (isRedirect && <Redirect to={{pathname:'/catalog',state:{search}}} /> ) ||
        (
        <header className="container">
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                        <a className="navbar-brand" href="/">
                            <img src="/assets/img/header-logo.png" alt="Bosa Noga" />
                        </a>
                        <div className="collapase navbar-collapse" id="navbarMain">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item ">
                                    <NavLink exact to="/"  className="nav-link" activeClassName="active">
                                        Главная
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink exact to="/catalog"  className="nav-link" activeClassName="active">
                                        Каталог
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink exact to="/about"  className="nav-link"  activeClassName="active">
                                        О магазине
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink exact to="/contacts"  className="nav-link" activeClassName="active">
                                        Контакты
                                    </NavLink>
                                </li>
                            </ul>
                            <div>
                                <div className="header-controls-pics">
                                    <div 
                                        data-id="search-expander" 
                                        className="header-controls-pic header-controls-search"
                                        onClick={ (e) => { 
                                            e.preventDefault();
                                            searchHandle(search,isShownSearch);
                                        }}
                                    >
                                    </div>
                                    <NavLink exact to="/cart"  activeClassName="active">
                                        <Cart view='mini' />
                                    </NavLink>
                                    
                                </div>
                                {
                                    (
                                        <Search 
                                            value=''
                                            className={classNames(
                                                "header-controls-search-form form-inline",
                                                {"invisible":!isShownSearch})}
                                            onchange={ (search) =>{
                                                setSearchValue(search);
                                            } }  
                                            callback={(search) => {
                                                searchHandle(search, true);
                                            }} /> 
                                    )
                                }
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            <div className="banner">
                <img src="/assets/img/banner.jpg" className="img-fluid" alt="К весне готовы!" />
                <h2 className="banner-header">К весне готовы!</h2>
            </div>
        </header>
    );
    
}
