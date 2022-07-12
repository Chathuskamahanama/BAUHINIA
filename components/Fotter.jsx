import React from 'react'

const Fotter = () => {
    return (
        <div>
            <footer className={"bg-dark text-white  pt-5 pb-4"}>
                <div className={" container text-center text-md-left"}>
                    <div className={"row text-center text-center text-md-left"}>
                        <div className={"col-md-3 col-lg-3 col-xl-3 mx-auto mt-3 "}>
                            <h5 className={"mb-4 font-weight--bold text-warnig"}>BAUHINIA(PVT)Ltd</h5>
                            <p>we have diversified our product range from apparel to accessories.Throughout our<br />
                                our history ,we have been dedicated to providing a wide ariety of products to our community at the best level of quality</p>
                        </div>
                        <div className={"col-md-2 col-lg-2 col-xl-2 mx-auto mt-3"}>
                            <h5 className={"text-uppercase mb-4 font-weight-bold text-warning"}>CATEGORIES</h5>
                            <ul>
                                <li><a href="/gents" className={"text-white text-decoration-none"}>Men'sFashion</a></li>
                                <li><a href="/ladies" className={"text-white text-decoration-none"}>Women'sFashion</a></li>
                                <li><a href="/kids" className={"text-white text-decoration-none"}>Kid'sFashion</a></li>
                                <li><a href="/accessories" className={"text-white text-decoration-none"}>Accessories</a></li>
                            </ul>
                        </div>
                        <div className={"col-md-2 col-lg-2 col-xl-2 mx-auto mt-3"}>
                            <h5 className={"text-uppercase mb-4 font-weight-bold text-warning"}>COMPANY</h5>
                            <a href="/" className={"text-white text-decoration-none"}>About Us</a>
                            <a href="/" className={"text-white text-decoration-none"}>Contact Us</a>
                        </div>

                        <div className={"col-md-2 col-lg-2 col-xl-2 mx-auto mt-3"}>
                            <h5 className={"text-uppercase mb-4 font-weight-bold text-warning"}>QUICK LINKS</h5>
                            <a href="/" className={"text-white text-decoration-none"}>Account</a>
                            <a href="/" className={"text-white text-decoration-none"}>Order Tracking</a>
                            <a href="/" className={"text-white text-decoration-none"}>Size Guide  </a>
                        </div>
                        <div className={"col-md-2 col-lg-2 col-xl-2 mx-auto mt-3"}>
                            <h5 className={"text-uppercase mb-4 font-weight-bold text-warning"}>ONLINE OFFICE OPENING HOURS</h5>
                            <p className={"text-white"}>Mon-Fri : 9.00 AM to 5.30 PM</p>
                            <p className={"text-white"}>Saturday : 9.00 AM to 2.30 PM</p>
                            <p className={"text-white"}>Sunday : Closed </p>
                            <p className={"text-white"}>CONTACT US</p>
                            <p className={"text-white"}> 077 235 2235</p>
                            <p className={"text-white"}>FOR FREE UPDATES</p>
                            <p className={"text-white"}>077 235 2235</p>
                            <i className={"fas fa-home mr-3"}>No.146 Kandy Road, Kadawatha.</i>
                            <i className={"fas fa-enveloper mr-3"}>bauhinia@gmi.com</i>
                        </div>
                    </div>
                    <hr className={"mb-4"} />
                    <div className={"row align-items-center"}>
                        <div className={"col-md-7 col-lg-8"}>
                            <p >Copyright ©2022 All rights reserved by:</p>
                            <a className={"text-decoration-none"}>
                                <strong className={"text-warning"}>Providers</strong>
                            </a>
                        </div>
                    </div>
                    <div className={"col-md-5 col-lg-4"}>
                        <h6 className='text-uppercase mb-4 font-weight-bold text-warning container'>Social Mediea </h6>
                        <div className={"text-center text-md-right"}>
                            <ul className={"list-unstyled list-inline"}>
                                <li className={"list-inline-item"}>
                                    <img src="images/5282541_fb_social media_facebook_facebook logo_social network_icon.png"></img>
                                </li>
                                <li className={"list-inline-item"}>
                                    <img src="images/5282544_camera_instagram_social media_social network_instagram logo_icon.png"></img>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Fotter
