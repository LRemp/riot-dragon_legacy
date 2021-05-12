import React, { Component, useState, useEffect } from 'react';
import styles from './home.css';
import { Link } from 'react-router-dom';

function Home() {
    
    const [playerName, updateSearchName] = useState('');

    return (
        <div className="home">
            <form className="search">
                <input onChange={e => updateSearchName(e.target.value)}></input>
                <Link to={`/player/${playerName}`}>
                    <button>Search</button>
                </Link>
            </form>
        </div>
    );
}

export default Home;