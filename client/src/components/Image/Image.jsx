import React, { useEffect, useState } from 'react'
import './Image.css'

const Image = ({ blob, fileName, userName, message }) => {
  const [imageSrc, setImageSrc] = useState('')

  useEffect(() => {
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onloadend = function () {
      setImageSrc(reader.result)
    }
  }, [blob])

  return (
    <div className="image">
      <img src={imageSrc} alt={fileName}></img>
      <div
        className={
          userName === message.author
            ? 'message-text__me'
            : 'message-text author'
        }
      ></div>
    </div>
  )
}

export default Image
