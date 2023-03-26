import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div>
      <footer className="d-flex flex-wrap justify-content-evenly align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center justify-content-center">
          <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
            {" "}
          <span className="text-muted" style={{fontFamily:"'Yellowtail', cursive"}}>© 2023 TasteSwings</span>
          </Link>
        </div>

        <ul className="nav col-md-4 justify-content-evenly list-unstyled  d-flex"style={{fontFamily:" Mr Dafoe', cursive"}}>
          <li className="ms-3"><Link className="text-muted text-decoration-none" to="//https://github.com/ABHISHEKyadav281">github</Link></li>
          <li className="ms-3"><Link className="text-muted text-decoration-none" to="https://www.linkedin.com/in/abhishek-yadav-aab95b202/">linkdin</Link></li>
        </ul>
        
        <ul className="nav col-md-4 justify-content-center list-unstyled d-flex">
          <li className="ms-3"><Link className="text-muted" to="https://abhishekyadav281.github.io/portfolio/" style={{fontFamily:"'Lovers Quarrel', cursive"}}><h1> Abhi</h1></Link></li>
        </ul>

      </footer>
    </div>
  )
}
