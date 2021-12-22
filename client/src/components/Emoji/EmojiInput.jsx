import React from 'react'
import { Emoji } from 'emoji-mart'
import Button from 'react-bootstrap/esm/Button'
import './EmojiInput.css'

const EmojiInput = ({ emojis, onSubmit }) => {
  return (
    <div id="emoji-input">
      <div id="emoji-input-display">
        {emojis && emojis.length
          ? emojis.map((emoji, index) => {
              return <Emoji key={index} emoji={emoji} size={18} />
            })
          : null}
      </div>
      <Button onClick={() => onSubmit()}>Emoji</Button>
    </div>
  )
}

export default EmojiInput
