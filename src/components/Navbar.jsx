import React from 'react'
import DateTime from './DateTime'
import './navbar.scss'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='left'>
        <div className="apple-icon"><img src="./navbar-icons/apple.svg" alt="" /></div>
        <div className="nav-item">
            <p>Dhruv Aparnathi</p>
        </div>
        <div className="nav-item">
            <p>File</p>
        </div>
        <div className="nav-item">
            <p>Window</p>
        </div>
        <div className="nav-item">
            <p>Terminal</p>
        </div>
      </div>

      <div className='right'>
        <div className='wifi-logo'><img src="./navbar-icons/wifi.svg" alt="" /></div>
        <div><DateTime /></div>
      </div>
    </nav>
  )
}

export default Navbar
