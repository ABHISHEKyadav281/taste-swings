import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Axios from "../components/Axios"
const baseURL= process.env.REACT_APP_API_URL;


export default function Signup() {
  const notifyRegistration = () => toast.info("Registered successfully");
  let navigate = useNavigate();
  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", location: "" })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${baseURL}/register`, {
      method: "post",
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.location })
    });
    const json = await response.json();
    // console.log(json);

    if (!json.success) {
      alert("invalid credentials")
    }
    else {
      const response = await fetch(`${baseURL}/login`, {
        method: "post",
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
      });
      const json = await response.json();
      // console.log(json);

      if (!json.success) {
        alert("invalid credentials")
      }
      else {
        localStorage.setItem("userEmail", credentials.email);
        // console.log(localStorage.getItem("userEmail"));
        localStorage.setItem("authToken", json.authToken);
        // console.log(localStorage.getItem("authToken"));
        navigate('/');
        notifyRegistration();
      }

    }

  }
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }


  // return (
  //   <div>
  //     <Navbar></Navbar>
  //     <div className="container mt-5" style={{height:"72vh"}} >
  //       <form onSubmit={handleSubmit}>
  //         <div className="mb-3">
  //           <label forhtml="exampleInputName" className="form-label">Name</label>
  //           <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
  //         </div>
  //         <div className="mb-3">
  //           <label forhtml="exampleInputEmail1" className="form-label">Email address</label>
  //           <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} />
  //         </div>
  //         <div className="mb-3">
  //           <label forhtml="exampleInputPassword1" className="form-label">Password</label>
  //           <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />
  //           <div id="emailHelp" className="form-text" >Minimum 6 characters.</div>
  //         </div>
  //         <div className="mb-3">
  //           <label forhtml="exampleInputLocation1" className="form-label">Location</label>
  //           <input type="text" className="form-control" name='location' value={credentials.location} onChange={onChange} />
  //         </div>

  //         <button type="submit" className="btn btn-success m-3">Register</button>
  //         <Link to="/login" className="btn btn-danger m-3">Already a user</Link>
  //       </form>
  //     </div>

  //     <Footer></Footer>
  //   </div>
  // )

  return (
  <div>
    <Navbar />

    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow p-4" style={{ width: "380px", borderRadius: "12px" }}>
        <h3 className="text-center mb-4">Create Account</h3>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label htmlFor="inputName" className="form-label">Name</label>
            <input
              id="inputName"
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onChange}
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">Email Address</label>
            <input
              id="inputEmail"
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">Password</label>
            <input
              id="inputPassword"
              type="text"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
              placeholder="password"
              required
            />
            <small className="text-muted">Minimum 6 characters</small>
          </div>

          {/* Location */}
          <div className="mb-3">
            <label htmlFor="inputLocation" className="form-label">Location</label>
            <input
              id="inputLocation"
              type="text"
              className="form-control"
              name="location"
              value={credentials.location}
              onChange={onChange}
              placeholder="City, Country"
              required
            />
          </div>

          {/* Register Button */}
          <button type="submit" className="btn btn-success w-100 mt-2">
            Register
          </button>

          {/* Redirect */}
          <div className="text-center mt-3">
            <Link to="/login" className="text-decoration-none">
              Already a user? Login
            </Link>
          </div>
        </form>
      </div>
    </div>

    <Footer />
  </div>
);

}
