import React from 'react';
import styles from './Bubble.module.css';

export function Bubble(prop) {
    return (
        <>
            <div key={prop.id} className={prop.self === prop.name ? styles.containerMe : styles.containerThem}>
                <p key={prop.id} className={prop.self === prop.name ? styles.messageMe : styles.messageThem}>{`${prop.message || ''} ${prop.reaction || ''}`}</p>
                {prop.self !== prop.name ? <p className={styles.name}>{prop.name}</p> : null}
            </div>
        </>
    );
}
