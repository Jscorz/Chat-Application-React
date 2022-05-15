import React, { useState, useEffect } from 'react';
import useSocket from 'use-socket.io-client';
import { useImmer } from 'use-immer';
import './index.css';

const Messages = (props) =>
  props.data.map((m) =>
    m[0] !== '' ? (
      <li key={m[0]}>
        <strong>{m[0]}</strong> : <div className='innermsg'>{m[1]}</div>
      </li>
    ) : (
      <li key={m[1]} className='update'>
        {m[1]}
      </li>
    )
  );

function App() {
  const [id, setId] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [room, setRoom] = useState('');
  const [socket] = useSocket('<https://open-chat-naostsaecf.now.sh>');

  socket.connect();

  const [messages, setMessages] = useImmer([]);
  const [online, setOnline] = useImmer([]);

  useEffect(() => {
    socket.on('message que', (nick, message) => {
      setMessages((draft) => {
        draft.push([nick, message]);
      });
    });

socket.on('update',message => setMessages(draft => {
  draft.push(['',message])
}))

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
