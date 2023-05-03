import { FC, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';

import { GetChannelData } from '../../../types/channel';

type Props = {
  socket?: Socket;
  state: GetChannelData;
};

const SendMessage: FC<Props> = ({ socket, state }) => {
  const { channelId } = useParams();
  const [message, setMessage] = useState('');

  const sendMessage: React.KeyboardEventHandler<HTMLTextAreaElement> = useCallback(
    async (event) => {
      const isEnter = event.key === 'Enter';
      const isNewLine = isEnter && event.shiftKey === false;

      if (isEnter) event.preventDefault();

      if (!isNewLine || message.trim().length === 0 || !channelId) return;

      socket?.emit('send_message', {
        channelId: parseInt(channelId),
        content: message.trim(),
      });

      setMessage('');
    },
    [channelId, message, socket]
  );

  return (
    <>
      <textarea value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={sendMessage} maxLength={255} />

      <div className="stats">
        <span>Total Messages Sent: {state.messageSentTotal}</span>
        <span>Total Messages Sent in the last 5 min: {state.messageSent5Min}</span>
      </div>
    </>
  );
};

export default SendMessage;
