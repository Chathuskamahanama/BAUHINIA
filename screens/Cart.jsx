import React, { useEffect } from 'react'
import { useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../components/lib/init-firebase";
import { ImageList, ImageListItem } from "@mui/material";
import CartCard from '../components/CartCard';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const username = localStorage.getItem("username");

    const [items, setItems] = useState([])
    const [totalP, setTotalP] = useState(0)
    const navigate = useNavigate();
    const [noitem, setNoitem] = useState(false)

    function calTotalPrice() {
        var total = 0;
        items.forEach((item) => {
            total = total + (parseInt(item.data.price) * parseInt(item.data.quantity));
        })
        setTotalP(total)
    }

    function getCartItems() {
        const Ref = collection(db, "users", username, "cart");
        getDocs(Ref)
            .then(response => {

                const ct = response.docs.map(doc => ({
                    data: doc.data(),
                    id: doc.id,
                }))
                setNoitem(true)
                if (response.docs.length === 0) {
                    setNoitem(false)
                }
                setItems(ct)

            })
            .catch(error => console.log(error.message))
    }

    //pass data to checkout screen
    function passData() {
        items.forEach((item) => {
            console.log(item.data.id);
        })
        navigate("/checkout", { state: { items: items, totalP: totalP } })
    }

    useEffect(() => {
        getCartItems()
    }, [])

    useEffect(() => {
        calTotalPrice()
    }, [items])

    function no() {
        return <div className='container'>
            <h2 className='text-center mt-5'>Oops!</h2>
            <h2 className='text-center mb-5'>No items in your shopping cart</h2>
        </div>
    }

    function yes() {
        return <div className="m-4">
            <ImageList gap={12} sx={{ mb: 8, gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))!important', }}>
                {items.map((item) => (
                    <ImageListItem key={item.id}>
                        <CartCard key={item.id} clothItem={item} />
                    </ImageListItem>
                ))}
            </ImageList>

            <div className='card p-3 mb-3 '>
                <div className='row'>
                    <div className='col'>Total Price</div>
                    <div className='col text-end fw-bold'>Rs: {totalP}.00</div>
                </div>
            </div>
            <button onClick={() => passData()} className='btn btn-warning w-100'>Checkout</button>
        </div>
    }

    return (

        <div className="container">
            {noitem ? yes() : no()}
        </div>
    )
}

export default Cart;