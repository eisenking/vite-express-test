import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import FormContainer from '../../layouts/FormContainer/FormContainer';
import { toast } from 'react-toastify';

import { useLoginMutation } from '../../slices/userApiSlice';
import { setCredentials } from '../../slices/authSlice';
import CustomButton from '../../components/CustomButton/CustomButtom';

const LoginScreen = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ phone, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Войти / <Link to={'/register'}>Регистрация</Link></h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='phone'>
          <Form.Label>Телефон</Form.Label>
          <Form.Control
            type='phone'
            placeholder='Телефон'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type='password'
            placeholder='Введите пароль'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        
        <CustomButton  disabled={isLoading} type='submit' variant=''>
          Войти
        </CustomButton>

        {isLoading && <Loader />}
      </Form>

      <Row className='py-3'>
        <Col>
          Первый раз?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Регистрация
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;