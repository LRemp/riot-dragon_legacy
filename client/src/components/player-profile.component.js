import React, { useState, useEffect } from 'react';
import styles from './home.css';
import { Link } from 'react-router-dom';

function PlayerProfile({ match }) {
    
    useEffect(() => {
        console.log(match);
    }, []);

    return (
        <div>
            User profile
        </div>
    );
}

export default PlayerProfile;