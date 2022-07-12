import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from './lib/init-firebase';

const ProductDetails = () => {
    const [products, setProducts] = useState(0)
    const [gents, setGents] = useState(0)
    const [ladis, setLadis] = useState(0)
    const [kids, setKids] = useState(0)
    const [accessories, setAccessoires] = useState(0)

    const [empty, setEmpty] = useState(0)
    const [low, setLow] = useState(0)

    const [cloths, setCloths] = useState([])

    function getAllProductsCount() {
        const gentsRef = collection(db, "Cloths");
        getDocs(gentsRef)
            .then(response => {
                setProducts(response.size)
                const ct = response.docs.map(doc => ({
                    data: doc.data(),
                    id: doc.id,
                }))

                const g = ct.filter(item => item.data.select == "gents")
                const l = ct.filter(item => item.data.select == "ladies")
                const k = ct.filter(item => item.data.select == "kids")
                const a = ct.filter(item => item.data.select == "acessories")

                setGents(g.length)
                setLadis(l.length)
                setKids(k.length)
                setAccessoires(a.length)

                const emCloth = ct.filter(item => item.data.quantity == 0)
                const lwCloth = ct.filter(item => item.data.quantity < 10)

                setEmpty(emCloth.length)
                setLow(lwCloth.length)

                console.log(emCloth.length)
                console.log(lwCloth.length)
            })
            .catch(error => console.log(error.message))
    }

    function getCloths() {
        const gentsRef = collection(db, "Cloths");
        getDocs(gentsRef)
            .then(response => {
                const ct = response.docs.map(doc => ({
                    data: doc.data(),
                    id: doc.id,
                }))
                setCloths(ct)
            })
    }

    useEffect(() => {
        getAllProductsCount()
        getCloths()
    }, [])

    return (
        <div className='col card m-3 p-1'>
            <h2 className='text-center'>Products Details</h2>
            <div className=''> {/**d-flex justify-content-center m-3 */}
                <div className='row m-2'>
                    <div className='col m-2 p-4 card bg-primary'>
                        <h2 className='text-center text-white'>{gents}</h2>
                        <h6 className='text-center text-white'>Gents</h6>
                    </div>
                    <div className='col m-2 p-4 card bg-primary'>
                        <h2 className='text-center text-white'>{kids}</h2>
                        <h6 className='text-center text-white'>Kids</h6>
                    </div>
                    <div className='col m-2 p-4 card bg-primary'>
                        <h2 className='text-center text-white'>{ladis}</h2>
                        <h6 className='text-center text-white'>Ladies</h6>
                    </div>
                    <div className='col m-2 p-4 card bg-primary'>
                        <h2 className='text-center text-white'>{accessories}</h2>
                        <h6 className='text-center text-white'>Accessories</h6>
                    </div>
                </div>
                <div className='row m-2'>
                    <div className='col m-2 p-4 card bg-primary'>
                        <h2 className='text-center text-white'>{empty}</h2>
                        <h6 className='text-center text-white'>Empty Products</h6>
                    </div>
                    <div className='col m-2 p-4 card bg-primary'>
                        <h2 className='text-center text-white'>{low}</h2>
                        <h6 className='text-center text-white'>Low Products {"<"}10</h6>
                    </div>
                    <div className='col m-2 p-4 card bg-primary'>
                        <h2 className='text-center text-white'>{products}</h2>
                        <h6 className='text-center text-white'>Total Products</h6>
                    </div>
                </div>
                <div className='row m-1'>
                    {cloths.map(function (item, index) {
                        return <div key={index} className='row p-1 m-1 border border-success rounded'>
                            <div className='col'>{item.data.title}</div>
                            <div className='col text-center'>{item.data.quantity}</div>
                            <div className='col text-end'>Rs.{item.data.price}.00</div></div>;
                    })}
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;