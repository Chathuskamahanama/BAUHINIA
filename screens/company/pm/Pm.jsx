import React from 'react'
import OrderDetails from '../../../components/OrderDetails';
import ProductDetails from '../../../components/ProductDetails';

const Pm = () => {

    return (
        <div className='mt-5 mb-5'>
            <div className='row'>
                <OrderDetails />
                <ProductDetails />
            </div>
        </div>
    )
}

export default Pm;