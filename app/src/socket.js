import { io } from 'socket.io-client'

const { hostname, port } = window.location;
const socketUrl = `ws://${hostname}:${port}/`;

// Create a singleton instance of the socket
const socket = io(socketUrl, {
  path: "/relay/socket.io/",
  query: { name: 'front-end', service: 'pwa' }
});
socket.on('connect', () => {
    console.log('connected to server')
    socket.emit('pwa',{topic: 'init', payload: {}})
})

socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });

export default socket
