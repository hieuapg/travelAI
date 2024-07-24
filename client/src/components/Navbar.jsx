import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../css/Navbar.css'
import { userContext } from '../App'
import axios from 'axios'

function Navbar() {
  const user = useContext(userContext)
    const navigate = useNavigate()

    console.log("User context:", user);
  console.log("Username:", user.username);

    const handleLogout = () => {
        axios.get('http://localhost:3000/logout')
        .then(res => {
            if(res.data === "Success")
            navigate('/login')
            setTimeout(() => {
              window.location.reload(); // Force reload
            }, 100);
        }).catch(err => console.log(err))
    }

  return (
    <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand playfair" href="/"><i>AI Nomad Navigator</i></a>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
          <li class="nav-item px-3">
              <Link class="nav-link link" to="/">HOME</Link>
            </li>
            {user.username ? (
  <li className="nav-item px-3">
    <Link className="link nav-link" onClick={handleLogout} to="#">LOGOUT</Link>
  </li>
) : (
  <>
    <li className="nav-item px-3">
      <Link className="nav-link link" to="/signup">SIGNUP</Link>
    </li>
    <li className="nav-item px-3">
      <Link className="link nav-link" to="/login">LOGIN</Link>
    </li>
  </>
)}
          
          </ul>
        </div>
      </div>
    </nav> 
  )
}

export default Navbar

