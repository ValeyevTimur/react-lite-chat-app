import React from 'react'
import socket from '../socket'

const EnterRoom = ({ userName, room }) => {
  if (userName !== '' && room !== '') {
    //Передача данных комнаты на бекэнд для соединения
    socket.emit('enter_room', room)
    console.log(userName)
  }
  return <div></div>
}

export default EnterRoom
