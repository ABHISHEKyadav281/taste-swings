import React, { useState } from 'react'
import { Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../Modal';
import Cart from '../screens/Cart';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCart, useDispatchCart } from './ContextReducer';

export default function Navbar() {
  const notifyLogout = () => { toast.warn("Logged out successfully") };
  const [cartView, setCartView] = useState(false)
  // const [active, setActive] = useState("1");
  let data = useCart();
  let dispatch = useDispatchCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    dispatch({ type: "Drop" });
    navigate("/login");
    notifyLogout();
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark " style={{ fontWeight: "600", backgroundColor: "rgb(1,95,95)" }}>
        <div className="container-fluid">
          <Link className="navbar-brand fs-3 fst-italic" to="/" style={{ fontFamily: "'Lovers Quarrel', cursive" }}><h1>Taste-Swings</h1> </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" data-bs-target="#navbarNav-collapse" ></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto ">
              <li className="nav-item">

                <Link className="nav-link active fs-5" aria-current="page" to="/" >Home</Link>
              </li>
              {(localStorage.getItem("authToken")) ? <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/myorder" >My Orders</Link>
              </li> : ""}
            </ul>
            {(localStorage.getItem("authToken")) ? <div className='d-flex'>
              <div className="btn btn-light text-success mx-2" aria-current="page" to="/" onClick={() => { setCartView(true) }}>
                my cart {" "}
                <Badge className='bg-danger rounded'>{data.length}</Badge>
              </div>
              {cartView ? <Modal onClose={() => { setCartView(false) }}>
                <Cart />
              </Modal> : null}
              <div className="btn btn-light text-danger fw-bold fst-italic mx-2" aria-current="page" onClick={handleLogout}>Logout</div>
            </div> :
              <div className='d-flex'>
                <Link className="btn btn-light text-success mx-1 fw-bold fst-italic" aria-current="page" to="/login">Login</Link>
                <Link className="btn btn-light text-success mx-1 fw-bold fst-italic" aria-current="page" to="/signup">Signup</Link>
              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}
