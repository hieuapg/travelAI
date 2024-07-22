import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Navbar.css'

const Navbar = () => {
  return (
    <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand playfair" href="/"><i>AI Nomad Navigator</i></a>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
          <li class="nav-item px-3">
              <Link class="nav-link link" to="/">HOME</Link>
            </li>
          <li class="nav-item px-3">
              <Link class="nav-link link" to="/signup">SIGNUP</Link>
            </li>
            <li class="nav-item px-3">
              <Link class="link nav-link" to="/login">LOGIN</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav> 
  )
}

export default Navbar