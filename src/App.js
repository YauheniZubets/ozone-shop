import React from 'react';
import './App.css';

import Header from './Header/Header';
import Main from './Main/Main';
import Cart from './Cart/Cart';

import getData from "./getData";
import searchHotSale from './searchHotSale';
import filterMinMax from './filterMinMax';
import searchFilter from './search';
import filterCategory from './filterCategory';

class App extends React.PureComponent {
  constructor() {
    super();
  }

  state= {
    showCart: false,
    allGoods : [],
    cartGoods : [],
    totalSum: 0,
    counter: 0
  }

  componentDidMount() {
    const cart = localStorage.getItem('cart') 
                ? JSON.parse(localStorage.getItem('cart')) : [];
    getData().then(data=>{
      //renderGoods(data);
      //this.props.goods(data);
      this.setState({allGoods: data, counter: cart.length || 0});
    });
    
  }

  openCart = () => {
    this.state.showCart ? this.setState({showCart: false}) : this.setState({showCart: true});
  }

  findGoods = (goods) => {
    getData().then(data=>{
      this.setState({allGoods: searchFilter(data, goods)});
    });
  }

  category = (value) => {
    getData().then(data=>{
      this.setState({allGoods: filterCategory(data, value)});
    });
  }

  priceFilter = (min, max, value) => {
    getData().then(data=>{
      this.setState({allGoods: filterMinMax(searchHotSale(data, value), min, max)});
    });
  }

  hotSaleFilter = (value, min, max) => {
    getData().then(data=>{
      this.setState({allGoods: searchHotSale(filterMinMax(data, min, max), value)});
    });
  }

  renderCart = (cart, totalSum, counter) => {
    let copyCart = [...cart];
    this.setState({cartGoods: copyCart, totalSum: +totalSum, counter: +counter || 0 });
  }

  render ()  {
    return (
      <>
        <Header openCart={this.openCart} find={this.findGoods} category={this.category} counter={this.state.counter}/>
        <Main goods={this.state.allGoods} priceFilter={this.priceFilter} 
          hotSale={this.hotSaleFilter} toCart={this.renderCart}
        />
        {
          this.state.showCart && <Cart closeCart={this.openCart} 
                                    goods={this.state.cartGoods} 
                                    totalSum={this.state.totalSum} 
                                    delFromCart={this.renderCart}
                                    />
        }
      </>
    );
  }
}

export default App;
