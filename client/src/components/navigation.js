import React, { Component, useState } from 'react'
import { Link } from "react-router-dom"
import styles from './navigation.css'

function Navbar(){

    const linkStyle = {
        color: 'white',
        textDecoration: 'none'
    }

    return (
        <div>
            <nav>
                <ul className="nav-links">
                    <Link to="/" style={linkStyle}>
                        <li>Home</li>
                    </Link>
                    <Link to="/search" style={linkStyle}>
                        <li>Search</li>
                    </Link>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;