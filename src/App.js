import React, {useEffect, useState} from 'react';
import {Login} from './components/login/Login';
import {MainView} from './components/main-view/MainView';
import { useSelector } from 'react-redux';
import { selectName } from './components/login/loginSlice';
import './App.css';

function App() {
  const [userName, setUsername] = useState('');
  const name = useSelector(selectName);
  
  useEffect(() => {
    setUsername(name)
  }, [name])
  

  return (
    <div className="App">
      <main className="App-main">
        { userName ? <MainView /> : <Login /> }
      </main>
    </div>
  );
}

export default App;
