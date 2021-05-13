import React, { useState, useEffect } from 'react';
import styles from './player.css';
import { Link } from 'react-router-dom';

function PlayerProfile({ match }) {
    

    const [playerData, setPlayerData] = useState(null);

    useEffect(() => {
        fetchData();
        console.log(playerData == null ? "empty" : "not empty");
    }, []);

    const fetchData = async () => {
        console.log(match.params);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ player: match.params.playerid, region: "euw" })
        };

        fetch('/api/player', requestOptions)
            .then(data => data.json())
            .then(res => setPlayerData(res));
    }

    return (
        (playerData == null ? 
        <div className="profile-loading">
            <div class="loader"></div>
        </div>
            : 
        <div>
            <div className="player-profile-header">
                <div className="profile-icon-container" style={{ background: `url("http://ddragon.leagueoflegends.com/cdn/11.10.1/img/profileicon/${playerData.user.profileIconId}.png")`}}>
                    <span className="profile-level">200</span>
                </div>
                <span>{playerData.user.name}</span>
            </div>
            User profile
            <button onClick={fetchData}>
                Fetch data
            </button>
        </div>
        )
    );
}

export default PlayerProfile;