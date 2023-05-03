import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { API_URL } from '../../config';

import './style.scss';

type FormPayload = {
  username: string;
  password: string;
};

const Login = () => {
  const navigateTo = useNavigate();
  const { register, handleSubmit } = useForm<FormPayload>();

  const login = async (data: FormPayload) => {
    const { username, password } = data;

    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, { username, password });
      const { token } = data;

      localStorage.setItem('token', token);
      navigateTo('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit(login)}>
        <div>
          <label htmlFor="#username">Username</label>
          <input type="text" id="username" {...register('username')} required />
        </div>

        <div>
          <label htmlFor="#password">Password</label>
          <input type="password" id="password" {...register('password')} required />
        </div>

        <div>
          <input type="submit" value="Log in" />
        </div>
      </form>
    </div>
  );
};

export default Login;
