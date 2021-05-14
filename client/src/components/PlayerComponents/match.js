import React, { useState, useEffect } from 'react';
import styles from './match.css';

function Match({ data }) {

    return (
        <div class={`match ${data.playerData.result}`}>
            <div class="game-stats">
                <p>{data.matchData.matchType}</p>
                <div class="bar"></div>
                <p>{data.playerData.result}</p>
            </div>

            <div class="champion-data">
                <div class="champion-block">
                    <div class="champion">
                        <img class="champion-image" src={`http://ddragon.leagueoflegends.com/cdn/11.10.1/img/champion/${data.playerData.championData.championName}.png`} />
                    </div>
                    <div class="summoner-spells">
                        <img class="summoner-spell" src={`http://ddragon.leagueoflegends.com/cdn/11.10.1/img/spell/${data.playerData.spell1ID}.png`}></img>
                        <img class="summoner-spell" src={`http://ddragon.leagueoflegends.com/cdn/11.10.1/img/spell/${data.playerData.spell2ID}.png`}></img>
                    </div>
                    <div class="summoner-runes">
                        <img class="rune-type" src="{{this.playerData.perkPrimaryName}}"></img>
                        <img class="rune-type" src="{{this.playerData.perkSubStyleName}}"></img>
                    </div>
                </div>
                <p class="champion-name">{data.playerData.championData.championName}</p>
            </div>
            
            <div class="KDA">
                <p>{data.playerData.kills} / {data.playerData.deaths} / {data.playerData.assists}</p>
                <p>%:1 KDA</p>
            </div>

            <div class="stats">
                <p>Level {data.playerData.level}</p>
                <p>CS:{data.playerData.cs}</p>
            </div>

            <div class="items">
                
            </div>
        </div>
    );
}

export default Match;