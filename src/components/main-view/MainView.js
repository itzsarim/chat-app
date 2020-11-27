import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectName } from '../login/loginSlice';
import {Sidebar} from '../sidebar/Sidebar';
import {ChatView} from '../chat-view/ChatView';
import styles from './MainView.module.css';

export function MainView() {
    return (
        <>
        <div className={styles.wrapper}>
            <aside className={styles.sidebar}>
                <Sidebar />
            </aside>
            <section className={styles.chatView}>
                <ChatView />
            </section>
        </div>
        </>
    );
}
