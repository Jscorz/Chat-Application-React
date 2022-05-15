import React, { useState } from 'react';
import useSocket from 'use-socket.io-client';
import './index.css';

function App() {
  const [id, setId] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [room, setRoom] = useState('');
  const [socket] = useSocket('<https://open-chat-naostsaecf.now.sh>');

  socket.connect();
  console.log(socket);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nameInput) {
      return alert("Name can't be empty");
    }
    setId(firstName);
    socket.emit('join', firstName, room);
  };

  return id !== '' ? (
    <div>Hello</div>
  ) : (
    <section style={{ textAlign: 'center', margin: '30vh auto', width: '70%' }}>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input
          id='firstName'
          onChange={(e) => setNameInput(e.target.value.trim())}
          required
          placeholder='What is your name ..'
        />
        <br />
        <input
          id='room'
          onChange={(e) => setRoom(e.target.value.trim())}
          placeholder='What is your room ..'
        />
        <br />
        <button type='submit'>Submit</button>
      </form>
    </section>
  );
}

export default App;
