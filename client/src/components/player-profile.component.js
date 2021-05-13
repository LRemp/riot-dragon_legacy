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

    const profileIconStyle = {
        background: playerData == null ? "" : `url("http://ddragon.leagueoflegends.com/cdn/11.10.1/img/profileicon/${playerData.user.profileIconId}.png")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
    }

    const rankedSoloStyle = {
        width: '3vw',
    }

    return (
        (playerData == null ? 
        <div className="profile-loading">
            <div class="loader"></div>
        </div>
            : 
        <div>
            <div className="player-profile-header">
                <div className="profile-icon-container" style={profileIconStyle}>
                    <span className="profile-level">{playerData.user.summonerLevel}</span>
                </div>
                <span>{playerData.user.name}</span>
                <div className="player-ranks">
                    <div className="rank-box">
                        <img src={`/images/${playerData.data.soloImg}.png`} style={rankedSoloStyle} />
                        <div>
                            <span className="rank-header">Ranked Solo/Duo</span><br></br>
                            <span>{playerData.data.soloTier} {playerData.data.soloRank}</span><br></br>
                            <span className="rank-lower-text">{playerData.data.soloLP} / <span>{playerData.data.soloWins}W {playerData.data.soloLosses}L</span></span><br></br>
                            <span className="rank-lower-text">Win rate {playerData.data.soloWinrate}%</span>
                        </div>
                    </div>
                    <div className="rank-box">
                        <img src={`/images/${playerData.data.flexImg}.png`} style={rankedSoloStyle} />
                        <div>
                            <span className="rank-header">Flex 5:5 ranked</span><br></br>
                            <span>{playerData.data.flexTier} {playerData.data.flexRank}</span><br></br>
                            <span className="rank-lower-text">{playerData.data.flexLP} / <span>{playerData.data.flexWins}W {playerData.data.flexLosses}L</span></span><br></br>
                            <span className="rank-lower-text">Win rate {playerData.data.flexWinrate}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    );
}

export default PlayerProfile;