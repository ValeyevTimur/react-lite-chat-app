import React, { useState } from 'react'
import './App.css'
import socket from './socket'
import Chat from './components/Chat/Chat'

function App() {
  const [userName, setUserName] = useState('')
  const [room, setRoom] = useState('')
  const [displayChat, setDisplayChat] = useState(false)

  const enterRoom = () => {
    if (userName !== '' && room !== '') {
      //Передача данных комнаты на бекэнд для соединения
      socket.emit('enter_room', room)
      // console.log(userName)

      //Изменение состояния. Если пользователь вошел в чат, отобразить его
      setDisplayChat(true)
    } else alert('Введите имя пользователя/комнату')
  }

  return (
    <>
      {!displayChat ? (
        <div className="wrapper">
          <form className="enter-chat">
            <h3>Войти в чат</h3>
            <label htmlFor="username">Имя</label>
            <input
              type="text"
              placeholder="Введите имя"
              onChange={(e) => setUserName(e.target.value)}
              id="username"
            />
            <label htmlFor="room">Комната</label>
            <input
              type="text"
              placeholder="Введите комнату"
              onChange={(e) => setRoom(e.target.value)}
              id="room"
            />
            <button onClick={enterRoom}>Войти</button>
          </form>
        </div>
      ) : (
        <>
          <Chat socket={socket} userName={userName} room={room} />
        </>
      )}
    </>
  )
}

export default App
