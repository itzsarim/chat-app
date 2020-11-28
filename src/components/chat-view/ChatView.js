import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectName } from '../login/loginSlice';
import { selectRoomId } from '../sidebar/sidebarSlice';
import { selectMessages, setMessages } from '../chat-view/chatSlice';
import { setRoomDetails, selectRoomDetailForId } from '../sidebar/sidebarSlice';
import { getChatMessages, getRoomsDetails as getRoomsDetailsApi, postChatMessage } from '../../api/chat-api';
import { Bubble } from '../bubble/Bubble';
import styles from './ChatView.module.css';

export function ChatView() {
    const dispatch = useDispatch();
    const roomId = useSelector(selectRoomId) || 0;
    const messages = useSelector(selectMessages);
    const roomDetail = useSelector(selectRoomDetailForId);
    const selfName = useSelector(selectName);
    const [pollTimerId, setTimerId] = useState('');
    const [chatMessage, setChatMessage] = useState('');
    
    function pollForChat() {
        if(pollTimerId) {
            clearInterval(pollTimerId);
        }
        setTimerId(setInterval(() => {
            getMessages();
        }, 5000));
    }

    function handleSend(e) {
        const payload = {
            'name': selfName,
            'message': chatMessage
        }
        postChatMessage(roomId, payload);
        setChatMessage('');
        e.preventDefault();
    }

    async function getMessages() {
        const messages = await getChatMessages(roomId);
        dispatch(setMessages(messages));
    }

    async function getRoomsDetails() {
        const details = await getRoomsDetailsApi(roomId);
        dispatch(setRoomDetails(details));
    }

    useEffect(() => {
        getRoomsDetails();
        pollForChat();
    }, [roomId]);


    return (
        <>
        <div className={styles.header}> 
            <div className={styles.roomName}>{roomDetail && roomDetail[0] && roomDetail[0].name}</div>
            <div className={styles.participants}>{
                roomDetail && roomDetail[0] && roomDetail[0].users && roomDetail[0].users.map((user) => {
                    return <span>{`${user},`}</span>
                })
            }</div>
        </div>
        <div className={styles.main}>
            {messages && messages.map((message) => {
                return <Bubble name={message.name} message={message.message} id={message.id}/>
            })}
        </div>
        <div className={styles.footer}>
            <form className={styles.container} onSubmit={handleSend}>
                <input
                    type='text'
                    className={styles.enterMessage}
                    aria-label="type message here"
                    value={chatMessage}
                    placeholder={"Type a message"}
                    onChange={e => setChatMessage(e.target.value)}
                />
                <button
                    type="submit"
                    className={styles.button}
                    aria-label="submit username"
                >
                    <span>Send</span>
                </button>
            </form>
        </div>

        </>
    );
}
