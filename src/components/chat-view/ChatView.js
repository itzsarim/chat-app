import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectName } from '../login/loginSlice';
import { Bubble } from '../bubble/Bubble';
import styles from './ChatView.module.css';

export function ChatView() {
    return (
        <>
        <div className={styles.header}> 
            <div className={styles.roomName}>Tea chat</div>
            <div className={styles.participants}>Sarim Zaidi</div>
        </div>
        <div className={styles.main}>
            {[<Bubble />, <Bubble />, <Bubble />]}
        </div>
        <div className={styles.footer}>
            <input type='text' className={styles.enterMessage}></input>
            <button type='submit' className={styles.submit}>Send</button>
        </div>

        </>
    );
}
