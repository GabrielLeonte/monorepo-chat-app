import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Messages from './messages';
import { FetchingStatus } from '../../types/fetching';

import './style.scss';

const ChannelContent: FC = () => {
  const { channelId } = useParams();

  const [status, setStatus] = useState<FetchingStatus>('idle');
  const [messages, setMessages] = useState([]);
  const [channelData, setChannelData] = useState([]);

  const isFetching = status === 'fetching';

  useEffect(() => {
    setStatus('idle');
  }, [channelId]);

  return (
    <div className="channel-content">
      {isFetching ? (
        <p className="loading">Loading...</p>
      ) : (
        <>
          <div className="content">
            <div className="name"># general</div>

            <Messages />

            <textarea maxLength={255} onKeyDown={() => console.log('Send it!')} />
          </div>

          <div className="users">
            <div className="title">Users in this channel</div>
            <div>
              <p>string</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChannelContent;
