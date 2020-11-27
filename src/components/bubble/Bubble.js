import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectName } from '../login/loginSlice';
import styles from './Bubble.module.css';

export function Bubble(prop) {
    return (
        <>
        <div className={styles.container}>
            <div className={styles.message}>{prop.message}</div>
            <div className={styles.name}>{prop.name}</div>
        </div>
        </>
    );
}
