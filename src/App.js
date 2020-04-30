import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Game from './components/Game';

const App = function(props) {

  const [ isSignedIn, setIsSignedIn ] = useState(isUserSignedIn());

  useEffect(() => {
    window.firebase.auth().onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
    });
    return () => {
      // clean up auth subscription
    };
  });

  let content;

  if (!isSignedIn) {
    content = <button onClick={() => signIn()}>Sign in with Google</button>;
  } else {
    content = <Routes>
      <Route path="/" element={<Home />} />
      <Route path="game/:joinCode" element={<Game />} />
    </Routes>
  }
  return (
    <div>{content}</div>
  );
}

export default App;

function signIn() {
  var provider = new window.firebase.auth.GoogleAuthProvider();
  window.firebase.auth().signInWithPopup(provider);
}

function isUserSignedIn() {
  return !!window.firebase.auth().currentUser;
}
