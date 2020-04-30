import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Game.css';

const Game = function() {

  const uid = window.firebase.auth().currentUser.uid;
  const { joinCode } = useParams();
  const [ gameData, setGameData ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  useEffect(() => {
    const games = window.firebase.firestore().collection('games');
    games.where('joinCode', '==', joinCode)
      .onSnapshot(function(querySnapshot) {
          if (loading) {
            setLoading(false);
          }
          querySnapshot.forEach(function(doc) {
            const data = doc.data();
            const spectators = Object.entries(data.users)
              .filter(([k, v]) => v.role === 'Spectator').map(([k, v]) => v);
            const players = Object.entries(data.users)
              .filter(([k, v]) => v.role === 'Player' && k !== uid).map(([k, v]) => v);
            const cardLocs = Object.entries(data.cardLocs).map(([k, v]) => v);
            setGameData(Object.assign({ id: doc.id }, data, { cardLocs, players, spectators }));
          });
      });
    // TODO: Return a function that clears the subscription

  }, []);

  return (
    loading ? <div>Loading...</div> :
    !gameData ? <div>The join code {joinCode} doesn't match any games</div> :

    <div className="game">
      <div className="game_hand">
        <div>Card 1</div>
        <div>Card 2</div>
        <div>Card 3</div>
      </div>

      <div className="game_players">
        {gameData.players.map(player => <div key={player.nick}>
          <img src={player.image} />
          <div className="game_player-nick">{player.nick}</div>
          <div className="game_player-hand">
            {Array(player.handSize).fill().map(() => <div className="game_player-card"></div>)}
          </div>
        </div>)}
      </div>

      <div className="game_card-locs">
        {gameData.cardLocs.map((s, i) => <div style={{left:s.x, top:s.y}} key={i}>{s.label}</div>)}
      </div>

      <div className="game_join-code">
        <h2>Join code</h2>
        <div className="large">{joinCode}</div>
      </div>

      <div className="game_spectators">
        <h2>Spectators</h2>
        <div>
          {!gameData.spectators.length ? <span className="muted">No one is watching your game</span> :
            gameData.spectators.map(s => <div key={s.nick}>
              <img src={s.image} />
              <div>{s.nick}</div>
            </div>)
          }
        </div>
      </div>
    </div>
  )
}

export default Game;
