import { doc, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../../../components/lib/init-firebase'
import OrderDetails from '../../../components/OrderDetails'
import ProductDetails from '../../../components/ProductDetails'

const Admin = () => {
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [role, setRole] = useState("admin")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [mobile, setMobile] = useState("")

    function saveUser(e) {
        e.preventDefault()
        console.log(name, address, email, password, mobile)
        const ref = doc(db, "users", email)
        setDoc(ref, {
            name: name,
            address: address,
            role: role,
            email: email,
            telephone: mobile,
            password: password
        }).then(response => {
            console.log(response)
            setName("")
            setAddress("")
            setRole("admin")
            setEmail("")
            setPassword("")
            setMobile("")
        }).catch((error) => { console.log(error) })
    }

    return (
        <div className='mt-4 mb-4'>
            <h2 className='text-center'>Create Staff Account</h2>
            <div className="container d-flex justify-content-center">
                <div className={"card p-3 w-75"}>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="exampleInputtext" className="form-label">Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputtext1" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputAddress" className="form-label">Address</label>
                            <textarea type="text" rows={4} value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="exampleInputtext02" />
                        </div>
                        <div>
                            <label htmlFor="exampleInputPassword1" className="form-label">Select Account</label>
                            <select className="form-select" aria-label="select your Province" value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="admin" >Admin</option>
                                <option value="ca">Cheif Account</option>
                                <option value="clerk">Clerk </option>
                                <option value="pm">Product Manager</option>
                            </select>
                        </div>
                        <div className="mb-3 ">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email </label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputmobilenum" className="form-label">Mobile Number</label>
                            <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} className="form-control" id="exampleInputMobile Number" />
                        </div>
                        <div>
                            <button type="submit" onClick={(e) => saveUser(e)} className="btn btn-primary w-100">Register</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='row'>
                <ProductDetails />
                <OrderDetails />
            </div>

        </div>
    )
}

export default Admin;