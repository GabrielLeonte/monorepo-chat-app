import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Messages from './messages';
import Users from './users';

import { FetchingStatus } from '../../types/fetching';

import './style.scss';

const ChannelContent: FC = () => {
  const { channelId } = useParams();

  const [channelName, setChannelName] = useState(null);
  const [messageSent5Min, setMessageSent5Min] = useState(null);
  const [messageSentTotal, setMessageSentTotal] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const [status, setStatus] = useState<FetchingStatus>('idle');

  const isFetching = status === 'fetching';

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
            <div className="name"># {channelName}</div>

            <Messages messages={messages} />

            <textarea maxLength={255} onKeyDown={() => console.log('Send it!')} />
          </div>

          <Users users={users} />
        </>
      )}
    </div>
  );
};

export default ChannelContent;
