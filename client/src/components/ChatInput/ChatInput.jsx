import React from 'react'
import './ChatInput.css'

const ChatInput = ({ currentMessage, setCurrentMessage, sendMessage }) => {
  return (
    <textarea
      className="chat-input"
      type="text"
      value={currentMessage}
      onChange={(e) => setCurrentMessage(e.target.value)}
      onKeyPress={(e) => {
        e.key === 'Enter' && sendMessage()
      }}
    />
  )
}

export default ChatInput
