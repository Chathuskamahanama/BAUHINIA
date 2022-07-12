import React, { useEffect, useState } from 'react'
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, storage } from '../../../components/lib/init-firebase';
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { format } from 'date-fns';

const Clerk = () => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [catagory, setCatagory] = useState("gents")
    const [quantity, setQuantity] = useState("")
    const [image, setImage] = useState("")

    const [uid, setuId] = useState("")
    const [utitle, setuTitle] = useState("")
    const [uprice, setuPrice] = useState("")
    const [ucatagory, setuCatagory] = useState("gents")
    const [uquantity, setuQuantity] = useState("")
    const [uimage, setuImage] = useState("")

    const [cloths, setCloths] = useState([])

    function getAllProducts() {
        const gentsRef = collection(db, "Cloths");
        getDocs(gentsRef)
            .then(response => {
                const ct = response.docs.map(doc => ({
                    data: doc.data(),
                    id: doc.id,
                }))
                setCloths(ct)
            })
            .catch(error => console.log(error.message))
    }

    function addProduct(downloadURL) {
        const pid = getProducId();
        const cartRef = doc(db, "Cloths", pid)
        setDoc(cartRef, {
            id: pid,
            title: title,
            price: price,
            select: catagory,
            quantity: quantity,
            image: downloadURL,
        }).then(response => {
            console.log(response)
            setTitle("")
            setPrice("")
            setCatagory("")
            setQuantity("")
            setImage("")
            getAllProducts()
        }).catch((error) => { console.log(error) })
    }

    function getProducId() {
        return format(new Date(), 'yyyyMMddkkmmss')
    }

    function uploadImage(e) {
        e.preventDefault()
        if (image != "") {
            const imageRef = ref(storage, 'images/' + image.name)
            const uploadTask = uploadBytesResumable(imageRef, image);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        addProduct(downloadURL)
                    });
                }
            );
        }
    }

    function updateInit(id) {
        const ref = doc(db, "Cloths", id);
        getDoc(ref).then(response => {

            setuId(response.data().id)
            setuTitle(response.data().title)
            setuPrice(response.data().price)
            setuCatagory(response.data().select)
            setuQuantity(response.data().quantity)

        }).catch((error) => { console.log(error) })
    }

    function updateProduct(e){
        e.preventDefault()
        const ref = doc(db, "Cloths", uid);
        updateDoc(ref, {
            title: utitle,
            price: uprice,
            select: ucatagory,
            quantity: uquantity,
        }).then(response => {
            console.log(response)
        }).catch((error) => { console.log(error) })
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <div className='container mb-5'>
            <h2 className='text-center p-4'>Clack Admin Panel</h2>

            <div className='row'>
                <div className='col'>
                    <h4 className='text-center'>Add Products</h4>
                    <div className='card p-2'>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="exampleInputtext" className="form-label">Title</label>
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" id="exampleInputtext1" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputAddress" className="form-label">price</label>
                                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" id="exampleInputtext02" />
                            </div>
                            <div>
                                <label htmlFor="exampleInputPassword1" className="form-label">Catagory</label>
                                <select className="form-select" aria-label="select your Province" value={catagory} onChange={(e) => setCatagory(e.target.value)}>
                                    <option value="gents" >gents</option>
                                    <option value="ladies">ladies</option>
                                    <option value="kids">kids </option>
                                    <option value="acessories">acessories</option>
                                </select>
                            </div>
                            <div className="mb-3 ">
                                <label htmlFor="exampleInputEmail1" className="form-label">Quantity</label>
                                <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputmobilenum" className="form-label">Image</label>
                                <input type="file" onChange={(e) => setImage(e.target.files[0])} className="form-control" id="exampleInputMobile Number" />
                            </div>
                            <div>
                                <button type="submit" onClick={(e) => uploadImage(e)} className="btn btn-primary w-100">Add New Product</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='col'>
                    <h4 className='text-center'>Update Products</h4>
                    <div className='card p-2'>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="exampleInputtext" className="form-label">ID</label>
                                <input type="text" value={uid} onChange={(e) => setuId(e.target.value)} className="form-control" id="exampleInputtext1" disabled />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputtext" className="form-label">Title</label>
                                <input type="text" value={utitle} onChange={(e) => setuTitle(e.target.value)} className="form-control" id="exampleInputtext1" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputAddress" className="form-label">price</label>
                                <input type="text" value={uprice} onChange={(e) => setuPrice(e.target.value)} className="form-control" id="exampleInputtext02" />
                            </div>
                            <div>
                                <label htmlFor="exampleInputPassword1" className="form-label">Catagory</label>
                                <select className="form-select" aria-label="select your Province" value={ucatagory} onChange={(e) => setuCatagory(e.target.value)}>
                                    <option value="gents" >gents</option>
                                    <option value="ladies">ladies</option>
                                    <option value="kids">kids </option>
                                    <option value="acessories">acessories</option>
                                </select>
                            </div>
                            <div className="mb-3 ">
                                <label htmlFor="exampleInputEmail1" className="form-label">Quantity</label>
                                <input type="text" value={uquantity} onChange={(e) => setuQuantity(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div>
                                <button type="submit" onClick={(e) => updateProduct(e)} className="btn btn-primary w-100">Update Details</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <h4 className='mt-3'>Item List</h4>
            <div className="">

                {cloths.map((item) => (
                    <div className='card p-3 m-1 '>
                    <div className="row" key={item.id}>
                        {/* <Card key={item.id} clothItem={item} /> */}
                        <div className='col'>
                            <div className="row">Id: {item.id}</div>
                            <div className="row mt-1">Name: {item.data.title}</div>
                            <div className="row mt-1">Catagory: {item.data.select}</div>
                        </div>
                        <div className='col text-end'>Quantity: {item.data.quantity}</div>
                        <div className='col text-end'>Rs. {item.data.price}</div>
                        <div className='col text-end'>
                            <button onClick={() => updateInit(item.id)} className='btn btn-success'>Update</button>
                        </div>
                    </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Clerk;