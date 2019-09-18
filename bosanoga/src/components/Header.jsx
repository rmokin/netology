import React from 'react';
import {NavLink} from 'react-router-dom';

//import '../css/style.css';
import '../assets/img/header-logo.png';
import '../assets/img/banner.jpg';

export default function Header(props){

    return (
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
                                    <div data-id="search-expander" className="header-controls-pic header-controls-search"></div>
                                    <NavLink exact to="/cart"  activeClassName="active">
                                        <div className="header-controls-pic header-controls-cart">
                                            <div className="header-controls-cart-full">1</div>
                                            <div className="header-controls-cart-menu"></div>
                                        </div>
                                    </NavLink>
                                    
                                </div>
                                <form data-id="search-form" className="header-controls-search-form form-inline invisible">
                                    <input className="form-control" placeholder="Поиск" />
                                </form>
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
