import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectName } from '../login/loginSlice';
import styles from './Bubble.module.css';

export function Bubble(prop) {
    return (
        <>
            <div className={prop.self === prop.name ? styles.containerMe : styles.containerThem}>
                <p className={prop.self === prop.name ? styles.messageMe : styles.messageThem}>{prop.message}</p>
                {prop.self !== prop.name ? <p className={styles.name}>{prop.name}</p> : null}
            </div>
        </>
    );
}
