import React, { useState } from 'react'

const Modal = (props) => {
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState("");

    function setQuantityCard() {
        props.addtoCart(quantity)
    }

    return (
        <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Shop Now</button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{props.item.data.title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='row'>
                                <div className='col-7 mt-3'>Please Select Your Quantity 1 - {props.item.data.quantity}</div>
                                <div className='col'><input type='number' className='form-control w-50' min={1} max={props.item.data.quantity} value={quantity} onChange={e => { setQuantity(e.target.value); setError(''); }}></input></div>
                            </div>
                            <div className='text-center row text-danger' >{error}</div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={setQuantityCard} className="btn btn-primary">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;