import React, { useEffect, useState } from 'react'
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../components/lib/init-firebase";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();

    //changepwd
    const [username, setUsername] = useState("null")
    const [currentPwd, setCurrentPwd] = useState("")
    const [newPwd, setNewPwd] = useState("")
    const [rePwd, setRePwd] = useState("")
    const [error, setError] = useState("")

    //updateprofile
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [province, setProvince] = useState("Western")
    const [email, setEmail] = useState("")
    const [mobile1, setMobile1] = useState("")
    const [mobile2, setMobile2] = useState("")

    //getOrders
    const [orders, setOrders] = useState("")
    const [products, setProducts] = useState("")

    function getOrders() {
        var ref = collection(db, "Orders");
        getDocs(ref)
            .then(response => {
                console.log(username + " " + response.docs)
                const ct = response.docs.map(doc => ({
                    data: doc.data(),
                    id: doc.id,
                }))
                console.log(ct)
                const myOrders = ct.filter(item => item.data.username == username)
                //console.log(myOrders)
                //setNoitem(true)
                // if (response.docs.length === 0) {
                //     //setNoitem(false)
                // }
                //setItems(ct)

            })
            .catch(error => console.log(error.message))
    }

    function getProfileDetails() {
        const ref = doc(db, "users", username);
        getDoc(ref).then(response => {

            setEmail(response.data().email);
            setName(response.data().name);
            setAddress(response.data().address);
            setProvince(response.data().province);
            setMobile1(response.data().telephone1);
            setMobile2(response.data().telephone2);

        }).catch((error) => { setError("No User Found") })
    }

    function UpdateProfile(e) {
        e.preventDefault()
        const ref = doc(db, "users", username);
        updateDoc(ref, {
            name: name,
            address: address,
            province: province,
            telephone1: mobile1,
            telephone2: mobile2,
        }).then(response => {
            console.log(response)
        }).catch((error) => { console.log(error) })
    }

    function UpdatePassword(e) {
        e.preventDefault()
        const ref = doc(db, "users", username);
        getDoc(ref).then(response => {
            var pw = response.data().password;
            if (currentPwd == pw) {
                if (newPwd == rePwd) {
                    updateDoc(ref, {
                        password: newPwd,
                    }).then(response => {
                        console.log(response)
                    }).catch((error) => { console.log(error) })
                } else {
                    console.log("no match")
                }
            } else {
                console.log("no current")
            }
        }).catch((error) => { setError("No User Found") })
    }

    useEffect(() => {
        getProfileDetails()
        getOrders()
    }, [username])

    useEffect(() => {
        if (localStorage.getItem("username") != null) {
            setUsername(localStorage.getItem("username"))
        } else {
            navigate("/login")
        }
    }, [])

    function profileDetails() {
        return <div className='col'>
            <h2 className='text-center mt-4'>Update Your Profile</h2>
            <div className='card p-3 m-4'>
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
                        <label htmlFor="exampleInputmobilenum" className="form-label">Mobile Number 1</label>
                        <input type="text" value={mobile1} onChange={(e) => setMobile1(e.target.value)} className="form-control" id="exampleInputMobile Number" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputmobilenum" className="form-label">Mobile Number 2</label>
                        <input type="text" value={mobile2} onChange={(e) => setMobile2(e.target.value)} className="form-control" id="exampleInputMobile Number" />
                    </div>
                    <div>
                        <button type="submit" onClick={(e) => UpdateProfile(e)} className="btn btn-primary w-100">Update Details</button>
                    </div>
                </form>
            </div>
        </div>
    }

    function loginDetails() {
        return <div className='col'><h2 className='text-center mt-4'>Update Password</h2>
            <div className='card p-3 m-4'>
                <form>
                    <div className="mb-3 ">
                        <label htmlFor="exampleInputEmail1" className="form-label">Current Password </label>
                        <input type="text" value={currentPwd} onChange={(e) => setCurrentPwd(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputmobilenum" className="form-label">New Password</label>
                        <input type="text" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} className="form-control" id="exampleInputMobile Number" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputmobilenum" className="form-label">Confirm New Password</label>
                        <input type="text" value={rePwd} onChange={(e) => setRePwd(e.target.value)} className="form-control" id="exampleInputMobile Number" />
                    </div>
                    <div>
                        <button type="submit" onClick={(e) => UpdatePassword(e)} className="btn btn-primary w-100">Update Password</button>
                    </div>
                </form>
            </div>
        </div>
    }

    return (
        <div className='container'>
            <div className='row'>
                {profileDetails()}
                {loginDetails()}
            </div>
            <div className='card'>

            </div>
        </div>
    )
}

export default Profile;