import React, {useEffect, useState} from 'react';
import {Login} from './components/login/Login';
import {MainView} from './components/main-view/MainView';
import { useSelector } from 'react-redux';
import { selectName } from './components/login/loginSlice';
import './App.css';

function App() {
  const [userName, setUsername] = useState('');
  useEffect(() => {

  })
  

  return (
    <div className="App">
      <main className="App-main">
        {/* { name ? <MainView /> : <Login /> } */}
        {<MainView />}
      </main>
    </div>
  );
}

export default App;
