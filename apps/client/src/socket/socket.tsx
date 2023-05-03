import { io } from 'socket.io-client';

export const useSocketIo = () => {
  return io('http://localhost:8080', {
    autoConnect: false,
    extraHeaders: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};
