import axios from 'axios';
import { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

import Messages from './messages';
import Users from './users';

import { FetchingStatus } from '../../types/fetching';

import './style.scss';

const ChannelContent: FC = () => {
  const { channelId } = useParams();
  const [socket, setSocket] = useState<Socket>();

  // ---- STATE ---

  const [status, setStatus] = useState<FetchingStatus>('idle');

  const [channelName, setChannelName] = useState<string>();
  const [messageSent5Min, setMessageSent5Min] = useState<number>();
  const [messageSentTotal, setMessageSentTotal] = useState<number>();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const [message, setMessage] = useState('');

  // ---- CONSTANTS ----

  const isFetching = status === 'fetching';

  // ---- FUNCTIONS ----

  const loadChannelData = async (channelId: number) => {
    setStatus('fetching');

    try {
      const { data } = await axios.get(`http://localhost:3003/channels/${channelId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const { name, messageSent5Min, messageSentTotal, messages, users } = data;

      setChannelName(name);
      setMessageSent5Min(messageSent5Min);
      setMessageSentTotal(messageSentTotal);
      setMessages(messages);
      setUsers(users);
    } catch (error) {
      console.error(error);
    }

    setStatus('idle');
  };

  const sendMessage: React.KeyboardEventHandler<HTMLTextAreaElement> = useCallback(
    async (event) => {
      const isEnter = event.key === 'Enter';
      const isNewLine = isEnter && event.shiftKey === false;

      if (isEnter) event.preventDefault();

      if (!isNewLine || message.trim().length === 0) return;

      socket?.emit('send_message', {
        channelId,
        message: message.trim(),
      });

      setMessage('');
    },
    [channelId, message, socket]
  );

  // ---- EFFECTS ----

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) return;

    const newSocket = io('http://localhost:8080', {
      autoConnect: false,
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    setSocket(newSocket);

    newSocket?.connect();
    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (channelId) loadChannelData(parseInt(channelId));

    const onFooEvent = (value: any) => {
      // @ts-ignore
      setMessages((previous) => [...previous, value]);
    };

    socket?.on(`messages_channel_${channelId}`, onFooEvent);

    return () => {
      socket?.off(`messages_channel_${channelId}`, onFooEvent);
    };
  }, [channelId, socket]);

  // ---- RENDER ----

  return (
    <div className="channel-content">
      {isFetching ? (
        <p className="loading">Loading...</p>
      ) : (
        <>
          <div className="content">
            <div className="name"># {channelName}</div>

            <Messages messages={messages} />

            <textarea value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={sendMessage} maxLength={255} />

            <div className="stats">
              <span>Total Messages Sent: {messageSentTotal}</span>
              <span>Total Messages Sent in the last 5 min: {messageSent5Min}</span>
            </div>
          </div>

          <Users users={users} />
        </>
      )}
    </div>
  );
};

export default ChannelContent;
