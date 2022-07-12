import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from './lib/init-firebase';
import { format } from 'date-fns';

const OrderDetails = () => {
    //Orders
    const [allOrderCount, setAllOrderCount] = useState(0)
    const [monthOrderCount, setMonthOrderCount] = useState(0)
    const [todayOrderCount, setTodayOrderCount] = useState(0)
    const [orderD, setOrderD] = useState([])
    const [orderP, setOrderP] = useState([])

    function getAllOrderCount() {
        const gentsRef = collection(db, "orders");
        getDocs(gentsRef)
            .then(response => {
                setAllOrderCount(response.size)
                var t = 0
                var m = 0
                response.forEach(item => {
                    if (item.id.substring(7, 15) == getYearMonthDate()) {
                        t = t + 1
                    }

                    if (item.id.substring(7, 13) == getYearMonth()) {
                        m = m + 1
                    }
                })
                setTodayOrderCount(t)
                setMonthOrderCount(m)
            })
            .catch(error => console.log(error.message))
    }

    function getAllOrders() {
        const ref = collection(db, "orders");
        getDocs(ref)
            .then(response1 => {
                response1.forEach(item => {
                    const ct1 = response1.docs.map(doc1 => ({
                        data: doc1.data(),
                    }))
                    setOrderD(ct1)

                    const ref2 = collection(db, "orders", item.id, "products");
                    getDocs(ref2)
                        .then(response2 => {
                            const ct2 = response2.docs.map(doc2 => ({
                                data: doc2.data(),
                            }))
                            setOrderP((oldP) => [...oldP, ct2])
                        })
                        .catch(error => console.log(error.message))
                })
            })
            .catch(error => console.log(error.message))
    }

    useEffect(() => {
        getAllOrders()
        getAllOrderCount()
        // getAllProducts()
    }, [])

    function getYearMonth() {
        return format(new Date(), 'yyyyMM')
    }

    function getYearMonthDate() {
        return format(new Date(), 'yyyyMMdd')
    }

    return (

            <div className='col card m-3 p-1'>
                <h2 className='text-center'>Orders Details</h2>
                <div className='d-flex justify-content-center m-3'>
                    <div className='row'>
                        <div className='col m-2 p-4 card bg-primary'>
                            <h2 className='text-center text-white'>{todayOrderCount}</h2>
                            <h6 className='text-center text-white'>Today Orders</h6>
                        </div>
                        <div className='col m-2 p-4 card bg-primary'>
                            <h2 className='text-center text-white'>{monthOrderCount}</h2>
                            <h6 className='text-center text-white'>This Month Orders</h6>
                        </div>
                        <div className='col m-2 p-4 card bg-primary'>
                            <h2 className='text-center text-white'>{allOrderCount}</h2>
                            <h6 className='text-center text-white'>Total Orders</h6>
                        </div>
                        {orderD.map(function (item, index) {
                            return <div key={index} className='row border border-3 border-success rounded m-1 p-2'>
                                <div className='row'>
                                    <div className='col'>{item.data.oid}</div>
                                    <div className='col text-center'>{item.data.status}</div>
                                    <div className='col text-end'>Rs.{item.data.total}.00</div>
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <div>
                                            <div className="text-primary" type="button" data-bs-toggle="collapse" data-bs-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapseExample1 multiCollapseExample2">View All Details</div >
                                            <div className="row">
                                                <div className="col">
                                                    <div className="collapse multi-collapse" id="multiCollapseExample1">
                                                        <div className="card card-body">
                                                            <div>{item.data.email}</div>
                                                            <div>{item.data.name}</div>
                                                            <div>{item.data.address}</div>
                                                            <div>{item.data.province}</div>
                                                            <div>{item.data.telephone1}</div>
                                                            <div>{item.data.telephone2}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="collapse multi-collapse" id="multiCollapseExample2">
                                                        {/* {orderP.map(function (item1, index1) {
                                    console.log(item1[index1].data.quantity);
                                    <div class="card card-body">
                                        <div>{item1[index1].data.quantity}</div>
                                    </div>
                                })} */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="collapse" id="collapseExample">
                                                <div className='row'>
                                                    <div className='col'>
                                                        <div className="card card-body">

                                                        </div>
                                                    </div>
                                                    <div className='col'>
                                                        <div className="card card-body">
                                                            <div>{item.data.email}</div>
                                                            <div>{item.data.name}</div>
                                                            <div>{item.data.address}</div>
                                                            <div>{item.data.province}</div>
                                                            <div>{item.data.telephone1}</div>
                                                            <div>{item.data.telephone2}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>;
                        })}
                    </div>
                </div>
            </div>
       
    )
}

export default OrderDetails;
