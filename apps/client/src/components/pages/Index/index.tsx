import axios from 'axios';
import { useState, useEffect } from 'react';

import { FetchingStatus } from '../../types/fetching';

import './style.scss';

type ChannelObject = {
  name: string;
};

const Index = () => {
  const [status, setStatus] = useState<FetchingStatus>('idle');
  const [channels] = useState<Array<ChannelObject>>([]);

  const isFetching = status === 'fetching';

  const loadChannels = async () => {
    setStatus('fetching');

    try {
      const { data } = await axios.get('http://localhost:3003/channels', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      JSON.stringify(data);
    } catch (error) {
      console.error(error);
    }

    setStatus('idle');
  };

  useEffect(() => {
    loadChannels();
  }, []);

  return (
    <div className="index">
      <div className="channels">
        {isFetching ? <p className="item">Loading...</p> : null}
        {!isFetching && channels.length > 0 ? channels.map((channel) => <p>{channel?.name}</p>) : <p className="item">No channels have been created</p>}
      </div>

      <div className="channel-content">Hi</div>
    </div>
  );
};

export default Index;
