import { FC } from 'react';

import './style.scss';

type Props = {
  users: Array<any>;
};

const Users: FC<Props> = ({ users }) => {
  return (
    <div className="users">
      <div className="title">Users in this channel</div>

      <div>{users.length > 0 ? users.map((user, index) => <p key={index}>{user.username}</p>) : null}</div>
    </div>
  );
};

export default Users;
