import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectName, selectTimestamp } from '../login/loginSlice';
import styles from './Sidebar.module.css';

export function Sidebar() {
    //const name = useSelector(selectName);
    const name = 'Sarim Zaidi';
    //const timestamp = useSelector(selectTimestamp);
    const timestamp = '1606440728708';
    function getTimeSinceLogin() {
        let currentTimestamp = Date.now();
        let differenceInTimestamp = currentTimestamp - timestamp;
        let m = new Date(differenceInTimestamp * 1000).getMinutes();
        return m;
    }
    return (
        <>
        <div className={styles.container} >
            <div className={styles.header}>
                <div className={styles.name}>{name}</div>
                <div className={styles.online}>{`Online for ${getTimeSinceLogin()} minutes`}</div>{/* write logic to convert minutes to hours beyond 60 minutes */}
            </div>
            <ul>
                {[<li>Tea chat</li>, <li>Coffee chat</li>]}                
            </ul>
        </div>
        </>
    );
}
