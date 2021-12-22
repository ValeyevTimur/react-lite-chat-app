import React, { useEffect, useState } from 'react'
import EmojiRender from '../Emoji/EmojiRender'
import ChatInput from '../ChatInput/ChatInput'
import { Emoji } from 'emoji-mart'
import Image from '../Image/Image'
import './Chat.css'
import reactStringReplace from 'react-string-replace'
import sendSVG from '../../img/send.svg'
import fileSVG from '../../img/file.svg'
import ScrollToBottom from 'react-scroll-to-bottom'

const Chat = ({ socket, userName, room }) => {
  const [currentMessage, setCurrentMessage] = useState('')
  const [messageList, setMessageList] = useState([])
  const [file, setFile] = useState()

  const sendMessage = async () => {
    if (file) {
      const messageData = {
        room: room,
        author: userName,
        type: 'file',
        body: file,
        mimeType: file.type,
        fileName: file.name,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      }
      setFile()
      socket.emit('send_message', messageData)
      setMessageList((list) => [...list, messageData])
      setCurrentMessage('')
    } else {
      if (currentMessage !== '') {
        const messageData = {
          room: room,
          author: userName,
          body: currentMessage,
          time:
            new Date(Date.now()).getHours() +
            ':' +
            new Date(Date.now()).getMinutes(),
        }

        await socket.emit('send_message', messageData)
        //для отображения сообщений на "своем" экране
        setMessageList((list) => [...list, messageData])
        setCurrentMessage('')
      }
    }
  }

  const chooseFile = (e) => {
    setCurrentMessage(e.target.files[0].name)
    setFile(e.target.files[0])
  }

  const renderMessages = (message, index) => {
    if (message.type === 'file') {
      const blob = new Blob([message.body])
      return (
        <div
          className={userName === message.author ? 'message me' : 'message'}
          key={index}
        >
          <Image
            fileName={message.fileName}
            blob={blob}
            userName={message.author}
            message={message}
          />
        </div>
      )
    }

    return (
      <>
        <div className={userName === message.author ? 'message me' : 'message'}>
          <div className="message-content">
            <div
              className={
                userName === message.author
                  ? 'message-bubble isMe'
                  : 'message-bubble'
              }
            >
              <div className="message-text ">
                {reactStringReplace(message.body, /:(.+?):/g, (match, i) => (
                  <Emoji key={i} emoji={match} set="apple" size={22} />
                ))}
              </div>
            </div>
            <div
              className={
                userName === message.author
                  ? 'message-text__me'
                  : 'message-text author'
              }
            >
              <div className="description">
                <p>{message.author}</p>
                <p> {message.time}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  //Каждый раз когда происходит изменения на странице отрабатывает хук
  useEffect(() => {
    socket.on('recieve_message', (data) => {
      console.log(data)
      setMessageList((list) => [...list, data])
    })
  }, [socket])

  const addEmoji = ({ native }) => {
    setCurrentMessage((currentMessage + ' ' + native).trim())
  }

  return (
    <div className="container">
      <div className="header">
        <div className="chat-header">ReactJS Lite Chat</div>
      </div>
      <div className="main">
        <div className="chat">
          <ScrollToBottom className="messages">
            <div>{messageList.map(renderMessages)}</div>
          </ScrollToBottom>
        </div>
      </div>
      <div className="footer">
        <div className="chat-actions">
          <div className="actions-left">
            <div className="send-file" title="Выбрать изображение">
              <label htmlFor="choose-file" className="chous">
                <img src={fileSVG} alt="file-svg" />
              </label>
              <input
                className="input-file"
                id="choose-file"
                onChange={chooseFile}
                type="file"
              />
            </div>

            <EmojiRender chooseFile={chooseFile} addEmoji={addEmoji} />
          </div>

          <ChatInput
            currentMessage={currentMessage}
            setCurrentMessage={setCurrentMessage}
            sendMessage={sendMessage}
          />
          <div className="send-btn" onClick={sendMessage} title="Отправить">
            <img src={sendSVG} alt="send-svg" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
