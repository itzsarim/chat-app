import React, {useEffect, useState, useRef} from 'react';
import {Login} from './components/login/Login';
import {MainView} from './components/main-view/MainView';
import { useSelector } from 'react-redux';
import { selectName, setUsersName ,setLoginTimestamp } from './components/login/loginSlice';
import { useDispatch } from 'react-redux';
import './App.css';

function App() {
  const name = useSelector(selectName);
  const dispatch = useDispatch();
  useEffect(() => {
    if(name) {
      dispatch(setUsersName(name));
      dispatch(setLoginTimestamp(Date.now()));
    }
  }, []);
  return (
    <div className="App">
      <main className="App-main">
        { name ? <MainView /> : <Login /> }
      </main>
    </div>
  );
}

export default App;
