import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectName } from '../login/loginSlice';
import { selectRoomId } from '../sidebar/sidebarSlice';
import { selectMessages, setMessages } from '../chat-view/chatSlice';
import { setRoomDetails, selectRoomDetailForId } from '../sidebar/sidebarSlice';
import { getChatMessages, getRoomsDetails as getRoomsDetailsApi, postChatMessage } from '../../api/chat-api';
import { Bubble } from '../bubble/Bubble';
import { Emoji } from '../Emoji/Emoji';
import styles from './ChatView.module.css';
import Popover from '@material-ui/core/Popover';

export function ChatView() {
    const dispatch = useDispatch();
    const roomId = useSelector(selectRoomId) || 0;
    const messages = useSelector(selectMessages);
    const roomDetail = useSelector(selectRoomDetailForId);
    const selfName = useSelector(selectName);
    const [pollTimerId, setTimerId] = useState('');
    const [chatMessage, setChatMessage] = useState('');
    const [chatReaction, setChatReaction] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const scrollRef = useRef(null);

    const popOverOpen = Boolean(anchorEl);

    function scrollToBottom() {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    
    function pollForChat() {
        // clear any previous timer before starting a new poll
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
            'message': chatMessage,
            'reaction': chatReaction
        }
        postChatMessage(roomId, payload);
        setChatMessage('');
        setChatReaction('');
        e.preventDefault();
    }

    const handlepopclick = (e) => {
        setAnchorEl(e.target);
        e.preventDefault();
    }

    const handleEmojiPick = (e) => {
        setChatReaction(e.target.innerText);
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

    // custom hook to store previous message value for comparing later on
    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    const prevMessage = usePrevious(messages);

    useEffect(() => {
        getRoomsDetails();
    }, [])

    useEffect(() => {
        // check if the last message you polled is not same as the current message
        let lastSize = prevMessage && prevMessage.length;
        let currentSize = messages && messages.length;
        let prevLastId = lastSize && prevMessage[lastSize-1].id;
        let currentLastId = currentSize && messages[currentSize-1].id;
        // of messages are not same then get new room details and scroll to bottom
        if(prevLastId !== currentLastId) {
            getRoomsDetails();
            pollForChat();
            scrollToBottom();
        }
    }, [messages])

    // get new room details and start polling for chat as soon as roomid changes
    useEffect(() => {
        getRoomsDetails();
        getMessages();
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
                            if(user === selfName) return '';
                            return <span className={styles.userName} key={user}>{`, ${user}`}</span>
                        }

                        if(i === arr.length-1) {
                            return <span className={styles.userName} key={user}>{`${user}`}</span>
                        }
                        return <span className={styles.userName} key={user}>{`${user}, `}</span>
                    })
                }
            </div>
        </div>
        <div className={styles.main} ref={scrollRef}>
            {messages && messages.map((message) => {
                return <Bubble name={message.name} message={message.message} reaction={message.reaction} self={selfName} id={message.id} key={message.id}/>
            })}
        </div>
        <div className={styles.footer} >
            <form className={styles.formContainer} onSubmit={handleSend}>
                <input
                    type='text'
                    className={styles.enterMessage}
                    aria-label="type message here"
                    value={`${chatMessage}${chatReaction}`}
                    placeholder={"Type a message..."}
                    onChange={e => setChatMessage(e.target.value)}
                />
                <Popover 
                    open={popOverOpen}
                    anchorEl={anchorEl}
                    onClose={e => setAnchorEl(null)}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                >
                    <Emoji
                        handler={handleEmojiPick}
                    />   
                </Popover>
                <button
                    className={styles.button}
                    onClick = {handlepopclick}
                >
                    <span>🙂</span>
                </button>
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
