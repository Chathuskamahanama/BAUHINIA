import React from 'react'
import Card from '../components/Card'
import { collection, getDocs } from "firebase/firestore";
import { db } from "../components/lib/init-firebase";
import { useEffect } from "react";
import { useState } from "react";
import { ImageList, ImageListItem } from "@mui/material";

const Accessories = () => {
  const [cloths, setSetcolths] = useState([]);

  async function getAccessories() {
    const accessoriesRef = collection(db, "Cloths");
    getDocs(accessoriesRef)
      .then(response => {

        const ct = response.docs.map(doc => ({
          data: doc.data(),
          id: doc.id,
        }))

        const accessoriesCloth = ct.filter(item => item.data.select === "acessories")
        const availableCloth = accessoriesCloth.filter(item => item.data.quantity > 0)
        setSetcolths(availableCloth)
        console.log(availableCloth)
      })
      .catch(error => console.log(error.message))
  }

  useEffect(() => {
    getAccessories()
  }, [])

  return (
    <div>
      <h2 className={"bg-primary text-white text-center p-5"}>BAUHINIA Textiles</h2>
      <div id="carouselBasicExample" className="carousel slide carousel-fade" data-mdb-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-mdb-target="#carouselBasicExample" data-mdb-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-mdb-target="#carouselBasicExample" data-mdb-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-mdb-target="#carouselBasicExample" data-mdb-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="images\pexels-terje-sollie-298863.jpg" className="d-block w-100" alt="Sunset Over the City" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Home & Live Accessories</h5>
              <p>BAUHINIA , Sri Laknaka's Bigest Fashion Collection</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="images\pexels-terje-sollie-298863.jpg" className="d-block w-100" alt="Canyon at Nigh" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Home & Live Accessories</h5>
              <p>BAUHINIA , Sri Laknaka's Bigest Fashion Collection</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="images\ladies\pexels-zura-modebadze-5457524.jpg" className="d-block w-100" alt="Cliff Above a Stormy Sea" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Home & Live Accessories</h5>
              <p>BAUHINIA , Sri Laknaka's Bigest Fashion Collection</p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-mdb-target="#carouselBasicExample" data-mdb-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-mdb-target="#carouselBasicExample" data-mdb-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <h2 className={"bg-primary text-white text-center p-3"}>Home & Live Accessories</h2>
      <h2 className={"bg-light text-secondary text-center text-size-10 p-2"}>All Home & Live Accessories</h2>

      <div className="container">
        <ImageList gap={12} sx={{ mb: 8, gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))!important', }}>
          {cloths.map((item) => (
            <ImageListItem key={item.id}>
              <Card key={item.id} clothItem={item} />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </div>
  )
}

export default Accessories
