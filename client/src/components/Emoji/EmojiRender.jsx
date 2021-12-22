import React, { useState } from 'react'
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import emojiSVG from '../../img/emoji.svg'

const EmojiRender = ({ addEmoji }) => {
  const [visible, setVisible] = useState(false)
  const emojiRef = React.useRef()

  const toggleVisible = () => {
    setVisible(!visible)
  }

  const handleOutsideClick = (event) => {
    const path = event.path || (event.composedPath && event.composedPath())
    if (!path.includes(emojiRef.current)) {
      console.log('test')
      setVisible(false)
    }
  }

  React.useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick)
  }, [])

  return (
    <div
      className="emoji-list"
      ref={emojiRef}
      title="Выбрать смайл"
      onClick={toggleVisible}
    >
      <div>
        <img src={emojiSVG} alt="emoji-svg" />
      </div>

      {visible && (
        <div>
          <Picker onSelect={(emojiTag) => addEmoji(emojiTag)} />
        </div>
      )}
    </div>
  )
}

export default EmojiRender
