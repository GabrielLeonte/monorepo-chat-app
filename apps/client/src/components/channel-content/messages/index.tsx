import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { FC } from 'react';

import './style.scss';

dayjs.extend(localizedFormat);

type Props = {
  messages: Array<any>;
};

const Messages: FC<Props> = ({ messages }) => {
  const formatDate = (date: string) => dayjs(date).format('lll');

  return (
    <div className="messages">
      {messages.length > 0
        ? messages.map((message, index) => (
            <div key={index} className="message">
              <div className="header">
                <div className="username">{message.user.username}</div>
                <div className="date">{formatDate(message.createdAt)}</div>
              </div>
              <div className="message-content">{message.content}</div>
            </div>
          ))
        : null}
    </div>
  );
};

export default Messages;
