import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../components/lib/init-firebase";
import { format } from 'date-fns';

const Checkout = () => {
  const username = localStorage.getItem("username");

  const getdata = useLocation();
  const [item, setItem] = useState([])
  const [totalP, setTotalP] = useState(0)

  const [name, setName] = useState("")
  const [address, setAdress] = useState("")
  const [province, setProvince] = useState("")
  const [telephone1, setTelephone1] = useState("")
  const [telephone2, setTelephone2] = useState("")
  const [email, setEmail] = useState("")

  function placeOrder() {
    const orderId = getOrderId()
    item.forEach((product) => {
      console.log(product.data.id)
      saveData(orderId, product.data.id, product.data.title, product.data.quantity, "pending", product.data.price)
    })
  }

  function saveData(oid, pid, title, quantity, status, price) {
    const cartRef = doc(db, "orders", oid, "products", pid)
    setDoc(cartRef, {
      oid: oid,
      pid: pid,
      title: title,
      quantity: quantity,
    }).then(response => {
      console.log(response)
      const ref = doc(db, "orders", oid)
      setDoc(ref, {
        oid: oid,
        status: status,
        total: totalP,
        username: username,
        name: name,
        address: address,
        province: province,
        telephone1: telephone1,
        telephone2: telephone2,
        email: email,
      }).then(response => {
        console.log(response)
        addSummery(oid, pid, title, name, price, quantity)
      }).catch((error) => { console.log(error) })
    }).catch((error) => { console.log(error) })
  }

  function addSummery(oid, pid, title, name, price, quantity) {
    var yearmonth = getYearMonth()
    const cartRef = doc(db, "summery", yearmonth, "orders", oid, "products", pid)
    setDoc(cartRef, {
      oid: oid,
      pid: pid,
      title: title,
      price: price,
      name: name,
    }).then(response => {
      console.log(response)
      updateProductQuntity(pid, quantity)

    }).catch((error) => { console.log(error) })
  }

  function updateProductQuntity(pid, quantity) {
    const gentsRef = doc(db, "Cloths", pid);
    getDoc(gentsRef).then(response => {
      var newQuantity = parseInt(response.data().quantity) - quantity;
      updateDoc(gentsRef, {
        quantity: newQuantity
      }).then(response => {
        removeCart(pid)
      }).catch((error) => { console.log(error) })
    }).catch((error) => { console.log(error) })
  }

  function removeCart(pid) {
    const cartRef = doc(db, "users", username, "cart", pid)
    deleteDoc(cartRef).then(response => {
      console.log("deleted")
      setItem([])
      setTotalP(0)
      setName("")
    }).catch((error) => { console.log(error) })
  }

  function getOrderId() {
    var id = "orderId" + format(new Date(), 'yyyyMMddkkmm')
    return id
  }

  function getYearMonth() {
    return format(new Date(), 'yyyyMM')
  }

  useEffect(() => {
    setItem(getdata.state.items)
    setTotalP(getdata.state.totalP)
  }, [])

  return (
    <div className='container m-3'>
      <h3>Check Out Products</h3>
      <div className="card p-3">
        <div className='row fw-bold mb-2'>
          <div className='col'>Product Name</div>
          <div className='col text-center'>Quantity</div>
          <div className='col text-end'>Price</div>
        </div>
        {item.map(function (item) {
          return <div className='row border border-success rounded'>
            <div className='col'>{item.data.title}</div>
            <div className='col text-center'>{item.data.quantity}</div>
            <div className='col text-end'>Rs.{item.data.price}.00</div></div>;
        })}
        <div className='row fw-bold mt-3'>
          <div className='col'>Total</div>
          <div className='col text-end'>Rs.{totalP}.00</div>
        </div>
      </div>
      <div className='mt-4'>
        <h3>Customer Details</h3>
        <div className='card p-3'>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control m-1" placeholder="Name" />
          <textarea type="text" value={address} onChange={(e) => setAdress(e.target.value)} rows="4" className="form-control m-1" placeholder="Address" />
          <input type="text" value={province} onChange={(e) => setProvince(e.target.value)} className="form-control m-1" placeholder="Province" />
          <input type="text" value={telephone1} onChange={(e) => setTelephone1(e.target.value)} className="form-control m-1" placeholder="Telephone 1" />
          <input type="text" value={telephone2} onChange={(e) => setTelephone2(e.target.value)} className="form-control m-1" placeholder="Telephone 2" />
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control m-1" placeholder="Email" />
        </div>
      </div>

      <div className='mt-4'>
        <h3>Payment Details</h3>
        {/* <div class="card ">
          <div class="card-header">
            <form>
              <div class="form-group"> <label for="username">
                <h6>Card Owner</h6>
              </label> <input type="text" name="username" placeholder="Card Owner Name" required class="form-control " /> </div>
              <div class="form-group"> <label for="cardNumber">
                <h6>Card number</h6>
              </label>
                <div class="input-group"> <input type="text" name="cardNumber" placeholder="Valid card number" class="form-control " required /></div>
              </div>
              <div class="row">
                <div class="col-sm-8">
                  <div class="form-group"> <label><span class="hidden-xs">
                    <h6>Expiration Date</h6>
                  </span></label>
                    <div class="input-group"> <input type="number" placeholder="MM" name="" class="form-control" required /> <input type="number" placeholder="YY" name="" class="form-control" required /> </div>
                  </div>
                </div>
                <div class="col-sm-4">
                  <div class="form-group mb-4"> <label data-toggle="tooltip" title="Three digit CV code on the back of your card">
                    <h6>CVV <i class="fa fa-question-circle d-inline"></i></h6>
                  </label> <input type="text" required class="form-control" /> </div>
                </div>
              </div>
            </form>
          </div>
        </div> */}
        <div class="form-check">
          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
          <label class="form-check-label" for="flexRadioDefault2">Cash on delivery</label>
        </div>
        <button type="button" onClick={placeOrder} class="mt-3 mb-5 btn btn-success btn-block w-100 btn-lg"> Confirm Payment </button>
      </div>
    </div>
  )
}

export default Checkout
