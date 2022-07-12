import React, { useState } from 'react'
import { doc, setDoc } from "firebase/firestore";
import { db } from "../components/lib/init-firebase";
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [province, setProvince] = useState("Western")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [mobile1, setMobile1] = useState("")
    const [mobile2, setMobile2] = useState("")

    function saveUser(e) {
        e.preventDefault()
        console.log(name, address, province, email, password, mobile1, mobile2)
        const ref = doc(db, "users", email)
        setDoc(ref, {
            name: name,
            address: address,
            province: province,
            email: email,
            telephone1: mobile1,
            telephone2: mobile2,
            password: password,
            role: 'customer'
        }).then(response => {
            console.log(response)
            setName("")
            setAddress("")
            setProvince("")
            setEmail("")
            setPassword("")
            setMobile1("")
            setMobile2("")
        }).catch((error) => { console.log(error) })
    }

    function backtoLogin() {
        navigate("/login")
    }

    return (
        <div>
            <h2 className={"bg-primary text-white text-center p-5"}>Welcome Register Account</h2>
            <div className="d-flex justify-content-center mt-5 mb-5">
                <div className={"card p-3 w-50"}>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="exampleInputtext" className="form-label">Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputtext1" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputAddress" className="form-label">Address</label>
                            <textarea type="text" rows={5} value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="exampleInputtext02" />
                        </div>
                        <div>
                            <label htmlFor="exampleInputPassword1" className="form-label">Select your province</label>
                            <select className="form-select" aria-label="select your Province" value={province} onChange={(e) => setProvince(e.target.value)}>
                                <option value="Western" >Western</option>
                                <option value="Southern">Southern</option>
                                <option value="Estern">Estern </option>
                                <option value="North">North</option>
                                <option value="Central">Central</option>
                                <option value="North Central">North Central</option>
                                <option value="Uva">Uva</option>
                                <option value="Sabaragamuwa">Sabaragamuwa</option>
                                <option value="North Western">North Western</option>
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
                            <label htmlFor="exampleInputmobilenum" className="form-label">Mobile Number 1</label>
                            <input type="text" value={mobile1} onChange={(e) => setMobile1(e.target.value)} className="form-control" id="exampleInputMobile Number" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputmobilenum" className="form-label">Mobile Number 2</label>
                            <input type="text" value={mobile2} onChange={(e) => setMobile2(e.target.value)} className="form-control" id="exampleInputMobile Number" />
                        </div>
                        <div>
                            <button type="submit" onClick={(e) => saveUser(e)} className="btn btn-primary w-100">Register</button>
                        </div>
                    </form>
                    <button onClick={backtoLogin} className="btn btn-secondary mt-1 w-100">Back to Login</button>
                </div>
            </div>
        </div>
    )
}

export default Register
