import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import FormContainer from '../../layouts/FormContainer/FormContainer';
import { ReactComponent as GiftBoxIcon } from '../../assets/icons/navbar-gift-icon.svg'
import { toast } from 'react-toastify';
import './RegisterScreen.css';

import { useRegisterMutation } from '../../slices/userApiSlice';
import { setCredentials } from '../../slices/authSlice';
import CustomButton from '../../components/CustomButton/CustomButtom';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

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

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ name, phone, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <Row className='mb-2 justify-content-center'>
        <div className='register-screen__gift-box-icon'>
          <GiftBoxIcon />
        </div>
        <div>
          Подарок при регистрации - 5% скидка на первый заказ!
        </div>
        <div className='mt-2'>
          Уже заказывали у нас?
        </div>
        <div>
          Смело регистрируйтесь - скидка постоянного клиента не потеряется!
        </div>
      </Row>
      <h1>Регистрация / <Link to={'/login'}>Войти</Link></h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Имя и фамилия</Form.Label>
          <Form.Control
            type='name'
            placeholder='Имя и фамилия'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

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
            placeholder='Пароль'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Подтвердите пароль</Form.Label>
          <Form.Control
            type='password'
            placeholder='Подтвердите пароль'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <div>
          <CustomButton disabled={isLoading} type='submit'>
            Зарегистрироваться
          </CustomButton>
        </div>
        {isLoading && <Loader />}
      </Form>
      <Row className='py-2'>
        <Col>
          Уже есть аккаунт?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Войти
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;