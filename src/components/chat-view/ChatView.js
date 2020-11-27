import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectName } from '../login/loginSlice';
import { selectRoomId } from '../sidebar/sidebarSlice';
import { selectMessages, setMessages } from '../chat-view/chatSlice';
import { Bubble } from '../bubble/Bubble';
import styles from './ChatView.module.css';

export function ChatView() {
    const dispatch = useDispatch();
    const roomId = useSelector(selectRoomId) || 0;
    const messages = useSelector(selectMessages);
    function pollForChat() {
        setInterval(() => {
            getChatMessages();
        }, 3000);
    }

    async function getChatMessages() {
        const response = await fetch(`http://localhost:8080/api/rooms/${roomId}/messages`);
        const messages = await response.json();
        dispatch(setMessages(messages));
    }

    useEffect(() => {
        pollForChat();
    }, []);


    return (
        <>
        <div className={styles.header}> 
            <div className={styles.roomName}>Tea chat</div>
            <div className={styles.participants}>Sarim Zaidi</div>
        </div>
        <div className={styles.main}>
            {messages.map((message) => {
                return <Bubble name={message.name} message={message.message} id={message.id}/>
            })}
        </div>
        <div className={styles.footer}>
            <input type='text' className={styles.enterMessage} onChange={() => {}}></input>
            <button type='submit' className={styles.submit}>Send</button>
        </div>

        </>
    );
}
