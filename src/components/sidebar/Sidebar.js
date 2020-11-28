import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRooms } from '../../api/chat-api';
import { selectName, selectTimestamp } from '../login/loginSlice';
import styles from './Sidebar.module.css';
import { selectRoomId, selectRooms, setRooms, setSelectedRoomId } from './sidebarSlice';

export function Sidebar() {
    const dispatch = useDispatch();
    const name = useSelector(selectName);
    const timestamp = useSelector(selectTimestamp);
    const rooms = useSelector(selectRooms);
    const [duration, setDuration] = useState(0);
    const selectedRoomId = useSelector(selectRoomId) || 0;

    useEffect(() => {
        getRoomsInfo();
        setInterval(() => {
            getTimeSinceLogin();
        }, 60000);
    }, [])



    async function getRoomsInfo() {
        try {
            const rooms = await getRooms();
            dispatch(setRooms(rooms))
        } catch (e) {
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
                    {rooms && rooms.map((room) => {
                        return (
                            <li tabIndex="0" key={room.id} className={room.id === selectedRoomId ? styles.listActive : styles.list} onKeyPress={() => dispatch(setSelectedRoomId(room.id))} onClick={() => dispatch(setSelectedRoomId(room.id))}>
                                <p key={room.id} className={styles.para}>{room.name}</p>
                            </li>
                        )
                            
                    })
                    }
                </ul>
            </div>
        </>
    );
}
