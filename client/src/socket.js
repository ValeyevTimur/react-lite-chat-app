import io from 'socket.io-client'

const PORT = 'http://localhost:5000'
const socket = io.connect(PORT)

export default socket
