import React from "react";

class Card extends React.PureComponent {

    render () {
        return ( <>
            {
                this.props.noDiv ? 
                <div className="card" data-key={this.props.id}>
                    {this.props.sale && <div className="card-sale">🔥Hot Sale🔥</div>}
                    <div className="card-img-wrapper">
                        <span className="card-img-top"
                            style={{backgroundImage: `url(${this.props.image})`}}></span>
                    </div>
                    <div className="card-body justify-content-between">
                        <div className="card-price">{this.props.price}</div>
                        <h5 className="card-title">{this.props.name}</h5>
                        <button className="btn btn-primary">Удалить</button>
                    </div>
                </div>
                :
                <div className={!this.props.noDiv ? 'col-12 col-md-6 col-lg-4 col-xl-3' : ''} >
                    <div className="card" data-key={this.props.id}>
                        {this.props.sale && <div className="card-sale">🔥Hot Sale🔥</div>}
                        <div className="card-img-wrapper">
                            <span className="card-img-top"
                                style={{backgroundImage: `url(${this.props.image})`}}></span>
                        </div>
                        <div className="card-body justify-content-between">
                            <div className="card-price">{this.props.price}</div>
                            <h5 className="card-title">{this.props.name}</h5>
                            <button className="btn btn-primary">В корзину</button>
                        </div>
                    </div>
                </div>
            }
            </>
        )
    }
}

export default Card;