import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


export default function Signup() {
  let navigate = useNavigate();
  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", location: "" })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/register", {
      method: "post",
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.location })
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("invalid credentials")
    }
    else {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "post",
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
      });
      const json = await response.json();
      console.log(json);

      if (!json.success) {
        alert("invalid credentials")
      }
      else {
        localStorage.setItem("userEmail", credentials.email);
        // console.log(localStorage.getItem("userEmail"));
        localStorage.setItem("authToken", json.authToken);
        // console.log(localStorage.getItem("authToken"));
        navigate('/');
      }

    }

  }
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }


  return (
    <div>
      <Navbar></Navbar>
      <div className="container mt-5" style={{height:"72vh"}} >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label forhtml="exampleInputName" className="form-label">Name</label>
            <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label forhtml="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label forhtml="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />
            <div id="emailHelp" className="form-text" >Minimum 6 characters.</div>
          </div>
          <div className="mb-3">
            <label forhtml="exampleInputLocation1" className="form-label">Location</label>
            <input type="text" className="form-control" name='location' value={credentials.location} onChange={onChange} />
          </div>

          <button type="submit" className="btn btn-success m-3">Register</button>
          <Link to="/login" className="btn btn-danger m-3">Already a user</Link>
        </form>
      </div>
      <Footer></Footer>
    </div>
  )
}
