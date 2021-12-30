import React from "react";

import Card from "../Card/Card";
import postData from "../postData";

class Cart extends React.PureComponent {

    componentDidMount () {
        console.log('didMountCart');
    }

    cbCloseCart = () => {this.props.closeCart()};

    cbDeleteGood = (ev) => {
        if(ev.target.classList.contains('btn-primary')) {
            const cart = localStorage.getItem('cart')
            ? JSON.parse(localStorage.getItem('cart')) : [];
            const card = ev.target.closest('.card');
            const key = card.dataset.key;
            const index = cart.findIndex(item => item.id === +key);
            cart.splice(index, 1);
            const totalSum = cart.reduce((start, cur)=>start + cur.price, 0);
            localStorage.setItem('cart', JSON.stringify(cart));
            this.props.delFromCart(cart, totalSum);
        }
    }

    cbCartSend = () => {
        const cart = localStorage.getItem('cart')
            ? JSON.parse(localStorage.getItem('cart')) : [];
        //если локал сторидж то содерж корзины остается после перезагрузки
        postData(cart).then(()=>{
            localStorage.removeItem('cart');
            this.props.delFromCart([], 0);
        });
    }

    render () {
        let goodsIntoCart=null;
        const cart = localStorage.getItem('cart')
            ? JSON.parse(localStorage.getItem('cart')) : [];
            console.log(cart.length);
        if (cart.length > 0) {
            goodsIntoCart = cart.map((item, index)=> {
                return <Card key={index} image={item.img} price={item.price} name={item.title} sale={item.sale} id={item.id} noDiv={true} />
            })
        } else {
            goodsIntoCart = this.props.goods.map((item, index)=> {
                return <Card key={index} image={item.img} price={item.price} name={item.title} sale={item.sale} id={item.id} noDiv={true} />
            })
        }

        return (
            <div className="cart">
                <div className="cart-body">
                    <div className="cart-title">Корзина</div>
                    <div className="cart-total">Общая сумма: <span>{this.props.totalSum || 0}</span> руб</div>
    
                    <div className="cart-wrapper" onClick={this.cbDeleteGood}>
                        {
                            cart.length ? <>{goodsIntoCart}</>
                            : <div id="cart-empty">
                                Ваша корзина пока пуста
                            </div>
                        }
                    </div>
                    <button className="btn btn-primary cart-confirm" onClick={this.cbCartSend}>Оформить заказ</button>
                    <div className="cart-close" onClick={this.cbCloseCart}>
    
                    </div>
                </div>
            </div>
        )
    }
    
}

export default Cart;