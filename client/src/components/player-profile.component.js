import React, { useState, useEffect } from 'react';
import styles from './home.css';
import { Link } from 'react-router-dom';

function PlayerProfile({ match }) {
    
    useEffect(() => {
        console.log(match);
    }, []);


    const fetchData = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ player: match.params.playerid, region: "euw" })
        };

        fetch('/api/player', requestOptions)
            .then(data => data.json())
            .then(res => console.log(res));
    }

    return (
        <div>
            User profile
            <button onClick={fetchData}>
                Fetch data
            </button>
        </div>
    );
}

export default PlayerProfile;