import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./lib/init-firebase";

const NavigationBar = () => {
  const [username, setUsername] = useState("null");
  const [items, setItems] = useState("");

  function getCartItems() {
    const ref = collection(db, "users", username, "cart");
    getDocs(ref)
      .then(response => {
        setItems(response.docs.length)

      })
      .catch(error => console.log(error.message))
  }

  useEffect(() => {
    if (localStorage.getItem("username") != null) {
      setUsername(localStorage.getItem("username"))
      getCartItems()
    } else {
      setUsername("null")
    }
  }, [])

  return (
    <div>
      <nav className="sticky-top navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="/">Home</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link text-white" href="/gents">Men's Fashion</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/ladies">Women's Fashion</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/kids">Kids's Fashion</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/accessories">Accessories</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/contactus">Contact Us</a>
              </li>
            </ul>
            <div className="d-flex">
              <div className='cart'>
                <span className="">
                  <a href='/cart'><img src='images/shopping-cart.png' width='30' height={'30'} ></img></a>
                </span>
                <span className="text-danger fw-bold mb-5">{items}</span>
              </div>
              <div className='cart me-3'>
                <span>
                  <a href='/profile'><img src='images/user2.png' width='30' height={'30'}></img></a>
                </span>
              </div></div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
