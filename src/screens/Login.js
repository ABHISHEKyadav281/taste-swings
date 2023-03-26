import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" })
let navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(process.env.REACT_APP_API_URL+"/login", {
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
    else{
      localStorage.setItem("userEmail",credentials.email);
      // console.log(localStorage.getItem("userEmail"));
      localStorage.setItem("authToken",json.authToken);
      // console.log(localStorage.getItem("authToken"));
    navigate('/');
  }

  }
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }


  return (
    <div>
      <Navbar></Navbar>
      <div className="container" >
      <div className="container , mt-5" style={{height:"72vh"}}>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label forhtml="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label forhtml="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />

          </div>

          <button type="submit" className="btn btn-success m-3">Login</button>
          <Link to="/signup" className=" m-3">Forgot password</Link>
        </form>
      </div>
      </div>
      <Footer></Footer>
    </div>
  )
}
