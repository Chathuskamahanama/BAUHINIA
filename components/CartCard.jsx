import React from 'react'

const CartCard = (props) => {
    return (
        <div className="card">
            <img src={props.clothItem.data.image} width="10" height="190" className="card-img-top" alt="t shirt" />
            <div className="card-body">
                <h5 className="card-title">{props.clothItem.data.title}</h5>
                <h4 className='text-primary'>Rs.{props.clothItem.data.price}</h4>
                <div className='row text-center pt-3 pb-4'>
                    <div className='col'>Quantity</div>
                    <div className='col'>{props.clothItem.data.quantity}</div>
                </div>
            </div>
        </div>
    )
}

export default CartCard;
