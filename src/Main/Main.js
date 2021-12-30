import React from "react";
import Card from "../Card/Card";

class Main extends React.PureComponent {

    state = {
        minPrice: '',
        maxPrice: '',
        checkbox: false
    }

    cbInput = (ev) => {
        let current=ev.target.id;
        let value=ev.target.value;
        if (typeof +value === 'number' && !isNaN(+value)) {
            switch (current) {
                case 'min': this.setState({minPrice: value}, ()=>this.props.priceFilter(this.state.minPrice, this.state.maxPrice, this.state.checkbox));
                    break;
                case 'max': this.setState({maxPrice: value}, ()=>this.props.priceFilter(this.state.minPrice, this.state.maxPrice, this.state.checkbox));
                    break;
                default:
                    break;
            }
        }
    }

    cbChange = (ev) => {
        let current = ev.target.checked;
        console.log('current: ', current);
        !this.state.checkbox 
        ? this.setState({checkbox: true}, ()=>this.props.hotSale(this.state.checkbox, this.state.minPrice, this.state.maxPrice)) 
        : this.setState({checkbox: false}, ()=>this.props.hotSale(this.state.checkbox, this.state.minPrice, this.state.maxPrice));
    }

    cbAddToCart = (ev) => {
        if(ev.target.classList.contains('btn-primary')) {
            const card = ev.target.closest('.card');
            const key = card.dataset.key;
            const goods = JSON.parse(localStorage.getItem('goods'));
            const cart = localStorage.getItem('cart') 
                ? JSON.parse(localStorage.getItem('cart')) : [];
            const goodItem = goods.find((item) => {
                return item.id === +key;
            })
            cart.push(goodItem);
            const totalSum = cart.reduce((start, cur)=>start + cur.price, 0);
            localStorage.setItem('cart', JSON.stringify(cart));
            this.props.toCart(cart, totalSum, cart.length);
        }
        
    }
    
    render (props) {
        console.log('render main');
        let cards = this.props.goods.map((item, index) => {
            return <Card key={index} image={item.img} price={item.price} name={item.title} sale={item.sale} id={item.id} />
        });

        localStorage.setItem('goods', JSON.stringify(this.props.goods));

        return (
            <main>
                <div className="container">
                    <div className="row">
                        <div className="col-3 col-xl-2 d-none d-lg-block">
                            <div className="filter">
                                <div className="filter-title">
                                    <h5>Фильтр</h5>
                                </div>
                                <div className="filter-price">
                                    <div className="filter-price_title">
                                        Цена
                                    </div>
                                    <form>
                                        <div className="filter-price_range">
                                            <div className="filter-price_input-wrapper">
                                                <label htmlFor="min" className="filter-price_label">от</label>
                                                <input id="min" className="filter-price_input" 
                                                    onInput={this.cbInput} value={this.state.minPrice} />
                                            </div>
                                            <div className="filter-price_input-wrapper">
                                                <label htmlFor="max" className="filter-price_label">до</label>
                                                <input id="max" className="filter-price_input" 
                                                    onInput={this.cbInput} value={this.state.maxPrice} /></div>
                                        </div>
                                    </form>
                                </div>
                                <div className="filter-check">
                                    <label className="filter-check_label">
                                        <input type="checkbox" 
                                            className="filter-check_checkbox" 
                                            id="discount-checkbox" onChange={this.cbChange}  />
                                        <span className={`filter-check_checkmark ${this.state.checkbox && `checked`}`}></span>
                                        <span className="filter-check_label-text">Акция</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-9 col-xl-10">
                            <div className="container">
                                <div className="row no-gutters goods" onClick={this.cbAddToCart}>
                                    {cards}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default Main;