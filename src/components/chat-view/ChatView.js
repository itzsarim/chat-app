import React, { useState, useEffect, useRef } from 'react';
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
    const scrollRef = useRef(null);

    function scrollToBottom() {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    
    function pollForChat() {
        if(pollTimerId) {
            clearInterval(pollTimerId);
        }
        setTimerId(setInterval(() => {
            getMessages();
        }, 1500));
    }

    function handleSend(e) {
        const payload = {
            'name': selfName,
            'message': chatMessage
        }
        postChatMessage(roomId, payload);
        setChatMessage('');
        scrollToBottom();
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
    }, [])

    useEffect(() => {
        getRoomsDetails();
    }, [messages])

    useEffect(() => {
        getRoomsDetails();
        pollForChat();
    }, [roomId]);


    return (
        <>
        <div className={styles.header}> 
            <div className={styles.roomName}>{roomDetail && roomDetail[0] && roomDetail[0].name}</div>
            <div className={styles.participants}>
                {roomDetail && roomDetail[0] && roomDetail[0].users && roomDetail[0].users.includes(selfName) ? <span className={styles.selfName}>{selfName}</span> : null}
                {
                    roomDetail && roomDetail[0] && roomDetail[0].users && roomDetail[0].users.map((user, i, arr) => {
                        if(arr.includes(selfName)) {
                            if(user === selfName) return;
                            return <span className={styles.userName}>{`, ${user}`}</span>
                        }

                        if(i === arr.length-1) {
                            return <span className={styles.userName}>{`${user}`}</span>
                        }
                        return <span className={styles.userName}>{`${user}, `}</span>
                    })
                }
            </div>
        </div>
        <div className={styles.main} ref={scrollRef}>
            {messages && messages.map((message) => {
                return <Bubble name={message.name} message={message.message} self={selfName} id={message.id}/>
            })}
        </div>
        <div className={styles.footer} >
            <form className={styles.formContainer} onSubmit={handleSend}>
                <input
                    type='text'
                    className={styles.enterMessage}
                    aria-label="type message here"
                    value={chatMessage}
                    placeholder={"Type a message..."}
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
