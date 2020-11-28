import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    setUsersName,
    setLoginTimestamp
} from './loginSlice';
import styles from './Login.module.css';
// import { translate } from 'react-i18next';

export function Login({t}) {
  const dispatch = useDispatch();
  const [userName, setUsername] = useState('');

  function handleSubmit(e) {
    // Typically the server should also have validation on username as it should be unique in the system
    dispatch(setUsersName(userName));
    dispatch(setLoginTimestamp(Date.now()));
    e.preventDefault();
  }

  return (
    <>
      <div className={styles.wrapper}>
        <form className={styles.container} onSubmit={handleSubmit}>
            <input
                className={styles.username}
                aria-label="enter your username"
                value={userName}
                placeholder={"Type your username..."}
                pattern="^[a-zA-Z0-9_-]{3,16}$"
                title="Alphanumeric string that may include _ and – having a length of 3 to 16 characters."
                onChange={e => setUsername(e.target.value)}
              />
              <button
                type="submit"
                className={styles.button}
                aria-label="submit username"
              >
                <span>Join the DoorDash Chat!</span>
              </button>
        </form>
      </div>
    </>
  );
}
