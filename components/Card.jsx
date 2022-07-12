import React from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./lib/init-firebase";
import Modal from "./Modal";

const Card = (props) => {
  const username = localStorage.getItem("username");
  
  const addtoCart = (Quantity) => {
    console.log("add to cart" + props.clothItem.data.id + "  " + Quantity)
    const cartRef = doc(db, "users", username, "cart", props.clothItem.data.id)
    setDoc(cartRef, {
      id: props.clothItem.data.id,
      price: props.clothItem.data.price,
      title: props.clothItem.data.title,
      image: props.clothItem.data.image,
      quantity: Quantity,
      select: props.clothItem.data.select
    }).then(response => {
      console.log(response)
    }).catch((error) => { console.log(error) })
  }

  return (
    <div className="col">
      <div className="card">
        <img src={props.clothItem.data.image} width="10" height="190" className="card-img-top" alt="t shirt" />
        <div className="card-body">
          <h5 className="card-title">{props.clothItem.data.title}</h5>
          <h4>Rs.{props.clothItem.data.price}</h4>
          <Modal item={props.clothItem} addtoCart={addtoCart} />
        </div>
      </div>
    </div>
  );
};

export default Card;
