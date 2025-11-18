import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Axios from "../components/Axios"
const baseURL= process.env.REACT_APP_API_URL;

export default function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" })
  let navigate=useNavigate();
  const notifyLogin = () => toast.success("Logged in successfully");
  const notifyInvalidLogin = () => toast.error("invalid credentials");

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      notifyInvalidLogin();
    }
    else{
      localStorage.setItem("userEmail",credentials.email);
      // console.log(localStorage.getItem("userEmail"));
      localStorage.setItem("authToken",json.authToken);
      // console.log(localStorage.getItem("authToken"));
    navigate('/');
    notifyLogin();
  }


  }
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }


  // return (
  //   <div>
  //     <Navbar></Navbar>

  //     <div className="container" >
  //     <div className="container , mt-5" style={{height:"72vh"}}>
  //       <form onSubmit={handleSubmit}>

  //         <div className="mb-3">
  //           <label forhtml="exampleInputEmail1" className="form-label">Email address</label>
  //           <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} />
  //         </div>
  //         <div className="mb-3">
  //           <label forhtml="exampleInputPassword1" className="form-label">Password</label>
  //           <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />

  //         </div>

  //         <button type="submit" className="btn btn-success m-3">Login</button>
  //         <Link to="/signup" className=" m-3">Forgot password</Link>
  //       </form>
  //     </div>
  //     </div>
  //     <Footer></Footer>
  //   </div>
  // )

  return (
  <div>
    <Navbar />

    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <div className="card shadow p-4" style={{ width: "380px", borderRadius: "12px" }}>
        <h3 className="text-center mb-4">Login</h3>

        <form onSubmit={handleSubmit}>
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
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Login button */}
          <button type="submit" className="btn btn-success w-100 mt-2">
            Login
          </button>

          {/* Extra links */}
          <div className="text-center mt-3">
            <Link to="/signup" className="text-decoration-none">
              Don't have an account? Register
            </Link>
          </div>
        </form>
      </div>
    </div>

    <Footer />
  </div>
);

}
