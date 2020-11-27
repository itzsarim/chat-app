import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectName } from '../login/loginSlice';
import styles from './Bubble.module.css';

export function Bubble() {
    return (
        <>
        <div className={styles.container}>
            <div className={styles.message}>This is a message</div>
            <div className={styles.name}>Sarim Zaidi</div>
        </div>
        </>
    );
}
