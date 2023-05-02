import { FC, PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UnprotectedPage: FC<PropsWithChildren> = ({ children }) => {
  const navigateTo = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) navigateTo('/');
  }, [navigateTo]);

  return <div>{children}</div>;
};

export default UnprotectedPage;
