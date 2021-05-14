import React, { useState, useEffect } from 'react';
import styles from './matchList.css';

function MatchList({ children }) {

    return (
        <div className="match-list">
            {children}
        </div>
    );
}

export default MatchList;