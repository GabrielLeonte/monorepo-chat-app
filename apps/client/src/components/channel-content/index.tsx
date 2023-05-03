import axios from 'axios';
import { FC, useCallback, useEffect, useState, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

import Messages from './messages';
import Users from './users';

import { API_URL, SOCKETS_URL } from '../../config';

import { FetchingStatus } from '../../types/fetching';
import { GetChannelData, MessageObject } from '../../types/channel';

import './style.scss';

const ChannelContent: FC = () => {
  const { channelId } = useParams();

  const [socket, setSocket] = useState<Socket>();
  const [status, setStatus] = useState<FetchingStatus>('idle');

  const [state, setState] = useReducer((state: GetChannelData, changes: Partial<GetChannelData>) => ({ ...state, ...changes }), {
    channelName: null,
    messageSent5Min: null,
    messageSentTotal: null,
    messages: [],
    users: [],
  });

  const [message, setMessage] = useState('');

  const isFetching = status === 'fetching';

  const loadChannelData = async (channelId: number) => {
    setStatus('fetching');

    try {
      const { data } = await axios.get(`${API_URL}/channels/${channelId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const { name, messageSent5Min, messageSentTotal, messages, users } = data;

      setState({
        channelName: name,
        messageSent5Min,
        messageSentTotal,
        messages,
        users,
      });
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

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) return;

    const newSocket = io(SOCKETS_URL, {
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
    const onMessageEvent = (newMessage: MessageObject) => {
      setState({ messages: [...state.messages, newMessage] });
    };

    socket?.on(`messages_channel_${channelId}`, onMessageEvent);

    return () => {
      socket?.off(`messages_channel_${channelId}`, onMessageEvent);
    };
  }, [channelId, socket, state.messages]);

  useEffect(() => {
    if (channelId) loadChannelData(parseInt(channelId));
  }, [channelId]);

  return (
    <div className="channel-content">
      {isFetching ? (
        <p className="loading">Loading...</p>
      ) : (
        <>
          <div className="content">
            <div className="name"># {state.channelName}</div>

            <Messages messages={state.messages} />

            <textarea value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={sendMessage} maxLength={255} />

            <div className="stats">
              <span>Total Messages Sent: {state.messageSentTotal}</span>
              <span>Total Messages Sent in the last 5 min: {state.messageSent5Min}</span>
            </div>
          </div>

          <Users users={state.users} />
        </>
      )}
    </div>
  );
};

export default ChannelContent;
