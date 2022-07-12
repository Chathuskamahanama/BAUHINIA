import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { db } from '../../../components/lib/init-firebase';
import { format } from 'date-fns';
import { useState } from 'react';

const Ca = () => {
    const [today, setToday] = useState(0)
    const [month, setMonth] = useState(0)
    const [total, setTotal] = useState(0)

    const [orders, setOrders] = useState(0)

    function getAllOrders() {
        const ref = collection(db, "orders");
        getDocs(ref)
            .then(response => {
                var t = 0
                var m = 0
                var total = 0;
                const ct = response.docs.map(doc => ({
                    data: doc.data(),
                    id: doc.id,
                }))
                setOrders(response.size)

                ct.forEach(item => {

                    if (item.id.substring(7, 15) == getYearMonthDate()) {
                        t = t + item.data.total
                        console.log("today" + item.data.total)
                    }

                    if (item.id.substring(7, 13) == getYearMonth()) {
                        m = m + item.data.total
                    }

                    total = total + item.data.total

                })
                setToday(t)
                setMonth(m)
                setTotal(total)
            })
            .catch(error => console.log(error.message))
    }

    function getYearMonth() {
        return format(new Date(), 'yyyyMM')
    }

    function getYearMonthDate() {
        return format(new Date(), 'yyyyMMdd')
    }

    useEffect(() => {
        getAllOrders()
    }, [])

    return (
        <div className='container mt-5 mb-5'>
            <div className='row'>
                <div className='col m-2 p-4 card bg-primary'>
                    <h2 className='text-center text-white'>Rs. {today}</h2>
                    <h6 className='text-center text-white'>Today Income</h6>
                </div>
                <div className='col m-2 p-4 card bg-primary'>
                    <h2 className='text-center text-white'>Rs. {month}</h2>
                    <h6 className='text-center text-white'>This Month Income</h6>
                </div>
                <div className='col m-2 p-4 card bg-primary'>
                    <h2 className='text-center text-white'>{orders}</h2>
                    <h6 className='text-center text-white'>Total Orders</h6>
                </div>
                <div className='col m-2 p-4 card bg-primary'>
                    <h2 className='text-center text-white'>Rs. {total}</h2>
                    <h6 className='text-center text-white'>Total Income</h6>
                </div>
            </div>
        </div>
    )
}

export default Ca;