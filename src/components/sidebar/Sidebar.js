import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRooms, selectRooms  } from './sidebarSlice';
import { selectName, selectTimestamp } from '../login/loginSlice';
import styles from './Sidebar.module.css';

export function Sidebar() {
    const dispatch = useDispatch();
    const name = useSelector(selectName);
    const timestamp = useSelector(selectTimestamp);
    const rooms = useSelector(selectRooms);
    const [duration, setDuration] = useState(0);
    
    useEffect(() => {
        getRooms();
        setInterval(() => {
            getTimeSinceLogin();
        }, 60000);
    },[])

    async function getRooms() {
        try {
            const response = await fetch('http://localhost:8080/api/rooms');
            const rooms = await response.json();
            dispatch(setRooms(rooms))
        } catch(e) {
            console.log('Cannot fetch rooms with error', e);
        }
        
    }
    function getTimeSinceLogin() {
        let currentTimestamp = Date.now();
        let differenceInTimestamp = currentTimestamp - timestamp;
        setDuration(Math.floor(differenceInTimestamp / 60000));
    }
    return (
        <>
        <div className={styles.container} >
            <div className={styles.header}>
                <div className={styles.name}>{name}</div>
                <div className={styles.online}>{`Online for ${duration} minutes`}</div>{/* write logic to convert minutes to hours beyond 60 minutes */}
            </div>
            <ul>
               {rooms.map((room) => {
                   return <li key={room.id}>{room.name}</li>
               })      
               }         
            </ul>
        </div>
        </>
    );
}
