import React from 'react';
import getData from '../getData';
import './header.css';

class Header extends React.PureComponent {

    state ={
        catalog: false
    }

    cbOpenCart = () => {this.props.openCart()};

    cbInput = (ev) => {
        const value= ev.target.value;
        console.log('value: ', value);
        this.props.find(value);
    }

    cbCatalog = () => {
        !this.state.catalog ? this.setState({catalog: true}) : this.setState({catalog: false});
    }

    clickHand = (ev) => {
        let value = ev.target.textContent;
        this.props.category(value);
    }

    render () {
        return (
            <header>
                <nav>
                <div className="container">
                    <div className="row">
                    <div className="col">
                        <div className="navbar-wrapper d-flex justify-content-between align-items-center">
                        <a className="logo" href="/"></a>
                        <div className="d-flex control-wrapper">
                            <div className="catalog-button">
                            <button onClick={this.cbCatalog}>
                                <span className="catalog-button_burger"></span><span className="catalog-button_text">Каталог</span>
                            </button>
                            {this.state.catalog && 
                                <div className="catalog">
                                    <ul className="catalog-list">
                                        <li onClick={this.clickHand}>Игровая приставка</li>
                                        <li onClick={this.clickHand}>Периферия для ПК</li>
                                        <li onClick={this.clickHand}>Игры и софт</li>
                                    </ul>
                                </div>
                            }
                            
                            </div>
                            <div className="search">
                            <div className="search-wrapper">
                                <input className="search-wrapper_input" type="text" onInput={this.cbInput} />
                            </div>
                            <div className="search-btn">
                                <button></button>
                            </div>
                            </div>
                        </div>
                        <a href="#" id="cart" onClick={this.cbOpenCart}>
                            <span className="counter">{this.props.counter}</span>
                            <span className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path fill="currentColor" fillRule="nonzero"
                                d="M6 6a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2h5.133L21.82 18.496A4 4 0 0 1 17.85 22H6.149a4 4 0 0 1-3.969-3.504L.867 8H6V6zm6 2a1 1 0 0 1 0 2H3.133l1.03 8.248A2 2 0 0 0 6.149 20h11.704a2 2 0 0 0 1.984-1.752L20.867 10H16V6a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2h4z">
                                </path>
                            </svg></span>
                            <span className="desc">Корзина</span>
                        </a>
                        </div>
                    </div>
                    </div>
                </div>
                </nav>
            </header>
        )
    }
}

export default Header;