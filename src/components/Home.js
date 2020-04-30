import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import generateCode from '../utils/generateCode';
import './Home.css';

const Home = function() {

  const [joinCode, setJoinCode] = useState('');

  const isJoinCodeValid = joinCode.length === 5;

  const navigate = useNavigate();

  return <div className="App">
    <h1>Card Game Engine</h1>
    <div>
      <div>
        <button onClick={() => createGame()}>Create game</button>
      </div>
      <div>
        <label>Join code</label>
        <input name="joinCodeInput"
          placeholder="Enter 5-letter code"
          autoComplete="off"
          maxLength="5"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
        />
        <button disabled={isJoinCodeValid ? null : 'disabled'}
          onClick={() => navigate(`/game/${joinCode}`)}>Join game</button>
      </div>
    </div>
  </div>
}

export default Home;

const createGame = function() {
  console.log('Create game');
  //gameService.create();
  const user = window.firebase.auth().currentUser.uid;
  const uid = user.uid;
  const newGame = {
    joinCode: generateCode(5),
    owner: uid,
    users: {
      [uid]: {
        handSize: 0,
        image: user.photoURL,
        nick: user.displayName,
        role: 'Player',
      }
    }
  };
  console.log(newGame);
}
