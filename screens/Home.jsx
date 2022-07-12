import React from 'react'

const Home = () => {
  return (
    <div>
      <h2 className={"bg-primary text-white text-center p-5"}> BAUHINIA Textiles</h2>
      <div id="carouselBasicExample" className="carousel slide carousel-fade" data-mdb-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-mdb-target="#carouselBasicExample" data-mdb-slide-to="0" className="active"
            aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-mdb-target="#carouselBasicExample" data-mdb-slide-to="1"
            aria-label="Slide 2"></button>
          <button type="button" data-mdb-target="#carouselBasicExample" data-mdb-slide-to="2"
            aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="images\518128-fashion-hd-wallpaper.jpg" className="d-block w-100"
              alt="Sunset Over the City" />
            <div className="carousel-caption d-none d-md-block">
              <h5>First slide label</h5>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="images\518128-fashion-hd-wallpaper.jpg" className="d-block w-100"
              alt="Canyon at Nigh" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Second slide label</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="images\518128-fashion-hd-wallpaper.jpg" className="d-block w-100"
              alt="Cliff Above a Stormy Sea" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Third slide label</h5>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-mdb-target="#carouselBasicExample"
          data-mdb-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-mdb-target="#carouselBasicExample"
          data-mdb-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <h2 className={"bg-primary text-white text-center pt-3 ps-3 pe-3 pb-3"}> CATEGORIES
      </h2>
      <table>
        <tbody>
          <tr>
            <td><a href="/gents"><img src="images\gents1.jpg" className="rounded float-left container" alt="men" /></a></td>
            <td><a href="/ladies"><img src="images\pexels-ditrich-oleg-9103472.jpg" className="rounded float-right container" alt="women" /></a></td>
            <td><a href="/kids"><img src="images\pexels-antoni-shkraba-6261891.jpg" className="rounded float-right container" alt="childern" /></a></td>
            <td><a href="/accessories"><img src="images\pexels-antony-trivet-9898246.jpg" className="rounded float-right container" alt="childern" /></a></td>
          </tr>
        </tbody>

      </table>

      <h1 className={"text-center pt-4"}> ~ About Us ~ </h1>
      <p className={"bg-white text-black text-center p-3"}>

        BAUHINIA Online (PVT) Ltd is based on the ideology of an accessible department store within Srilanka.Since the founding <br />
        Since the founding of the compan in 1990,we have diversified our product range from apparel to accessories.Throughout our<br />
        our history ,we have been dedicated to providing a wide ariety of products to our community at the best level of quality <br />
        possible.<br />

        Folowing a customer-focused apporoach within our comapnay,we give priority to customer service.our staff is continuously<br />
        A core value within our company is to give back to the community.we have  iniatated programs that have included inversment<br />
        infrastruture of various public monuments.
      </p>
    </div>
  )
}

export default Home
