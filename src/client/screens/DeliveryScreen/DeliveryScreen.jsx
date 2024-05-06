import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Card,} from 'react-bootstrap';
import {
  useGetProductDetailsQuery
} from '../../slices/productsApiSlice';
import {
  setDeliveryDate,
  setName,
  setEmail,
  setPhone,
  setAddress,
  setCommentary
} from '../../slices/orderSlice';
import { useCreateOrderMutation } from '../../slices/ordersApiSlice';
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import DatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
registerLocale("ru", ru);
import "react-datepicker/dist/react-datepicker.css";
import CustomButton from '../../components/CustomButton/CustomButtom';
import LeftArrow from '../../../../public/assets/icons/LeftArrow';
import './DeliveryScreen.css'

const DeliveryScreen = () => {
  const { id: productId } = useParams();

  // <--- Создание заказа --->
  
  const [createOrder] = useCreateOrderMutation();
  const order = useSelector((state) => state.order);
  const auth = useSelector((state) => state.auth);

  const guestInfo = {
    _id:"123456789123456789012345",
    name:"Гость",
    email:"niceracer@yandex.ru",
    isAdmin:false,
  }

  // const currentTastings = useSelector((state) => state.order.selectedTastings);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const {
    // eslint-disable-next-line
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  // <--- Выбор даты, времени и стоимости доставки --->
  
  const [deliveryType, setDeliveryType] = useState('Доставка');
  // eslint-disable-next-line
  const [deliveryPrice, setDeliveryPrice] = useState(850);
  const [startDate, setStartDate] = useState(new Date());
  
  // <--- Заполнение форм с React Hook Forms --->
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    dispatch(setDeliveryDate(startDate.toISOString()));
    dispatch(setName(data.name));
    dispatch(setEmail(data.email));
    dispatch(setPhone(data.phone));
    dispatch(setAddress(data.address));
    dispatch(setCommentary(data.commentary));
    console.log(errors);

  try {
    // Create order using the updated form data
    const res = await createOrder({
      order: { 
        name: data.name,
        tastings: order.selectedTastings,
        deliveryDate: startDate,
        price: data.price,
        email: data.email,
        phone: data.phone,
        address: data.address,
        commentary: data.commentary,
      },
      user: auth.userInfo ? {...auth.userInfo} : {...guestInfo},
    }).unwrap();
    console.log('Order placed successfully:', res);
    console.log(errors);
    navigate('/thankyou')
  } catch (err) {
    console.log(order);
    console.log(err);
    navigate(`/sorry`);
  }
  };

  return (
    <section>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className='delivery-screen__nav-row'>
            <div className='delivery-screen__nav-row--back-button'>
              <Link className='btn my-3' to={`/product/${productId}/order`}>
                <LeftArrow />
              </Link>
            </div>
            <div className='delivery-screen__nav-row--current-product'>
              {order.productId ? 
                (
                  <div className='delivery-screen__nav-row--current-product--info'>
                    <div> 
                      {order.productName}.
                    </div>
                    <div>
                      Вес - {order.orderWeight} кг.
                    </div>
                    {/* {Object.values(currentTastings).map((tasting, index) => (
                      <div key={index}>
                        {tasting.name}
                        {index < Object.values(currentTastings).length - 1 ? ', ' : ''}
                      </div>
                    ))} */}
                    <div>
                      Цена - {order.orderPrice} руб.
                    </div>
                    {deliveryType === 'Доставка' ? 
                      <div>
                        Доставка - {deliveryPrice} руб.
                      </div> 
                      :
                      null
                    }
                  </div>
                )
                :
                null
              }
            </div>
          </div>
          <Row>
            <Col md={4}>
              <Card>
                <Card.Body className='delivery-screen__card--body'>
                  <Card.Title>Доставка</Card.Title>
                  <Card.Subtitle></Card.Subtitle>   
                  <Form.Group className="text-center" controlId="deliveryType">
                    <Form.Label>
                      <h6>
                        Выберите тип доставки:
                      </h6>
                    </Form.Label>
                    <div className="delivery-screen__deliveryType">
                      <Form.Check
                        type="radio"
                        label="Доставка"
                        value="Доставка"
                        name="deliveryType"
                        onChange={() => setDeliveryType('Доставка')}
                        checked={deliveryType === 'Доставка'}
                      />
                      <Form.Check
                        type="radio"
                        label="Самовывоз"
                        value="Самовывоз"
                        name="deliveryType" 
                        onChange={() => setDeliveryType('Самовывоз')}
                        checked={deliveryType === 'Самовывоз'}
                      />
                    </div>
                  </Form.Group>
                  {deliveryType === 'Доставка' ? 
                  <div className='m-2 text-center'>
                    <div className='m-1'>
                      Стоимость доставки - {deliveryPrice} руб.
                    </div>
                    <h6 className='mt-3'>
                      Дата, время и адрес доставки:
                    </h6>
                    <DatePicker
                      className='delivery-screen__datepicker m-2'
                      placeholderText="Выберите дату и время доставки"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      minDate={new Date()}
                      locale="ru"
                      showTimeInput
                      timeFormat="HH:mm"
                      timeIntervals={60}
                      timeInputLabel="Время доставки:"
                      dateFormat="Pp"
                      withPortal
                    />
                    <div>
                      <textarea
                        type="text"
                        rows="3"
                        cols="23"
                        placeholder='Адрес доставки'
                        {...register("address", {
                          required: "Пожалуйста, введите Ваш адрес доставки",
                        })}
                      />
                      {errors.address && (
                        <p className="delivery-screen__error-message">
                          {errors.address.message}
                        </p>
                      )}
                    </div>
                  </div>
                  :
                  <div className='m-2 text-center'>
                    <h6>
                      Выберите дату самовывоза:
                    </h6>
                    <DatePicker 
                      className='delivery-screen__datepicker m-2'
                      minDate={new Date()}
                      locale="ru"
                      selected={startDate} 
                      onChange={(date) => setStartDate(date)}
                      withPortal
                    />
                    <div className=''>
                      Забрать заказ можно в нашем офисе с 10.00!
                    </div>
                    <div className='mt-1'>
                      Москва, ул. Подольских Курсантов, дом 26, стр 1, тц &quot;Зельгросс&quot;.
                    </div>
                  </div>
                  }
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body className='delivery-screen__card--body'>
                  <Card.Title className=''>Контакты</Card.Title>
                  <div className='delivery-screen__card--inputs'>
                    <Form.Group className='text-center' controlId="name">
                    <Form.Label>Имя и фамилия</Form.Label>
                    <Form.Control
                          type="name"
                          placeholder="Имя и фамилия"
                          {...register("name", {
                            required: "Заполните имя и фамилию",
                            pattern: {
                              value: /^[a-zA-Zа-яА-Я\s'-]+$/,
                              message: "Пожалуйста, заполните имя и фамилию"
                            }
                          })}
                        />
                        {errors.name && <span className="delivery-screen__error-message">{errors.name.message}</span>}
                      </Form.Group>
                      <Form.Group className="text-center" controlId="email">
                        <Form.Label>Электронная почта</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Электронная почта"
                          {...register("email", {
                            required: "Пожалуйста, введите Вашу электронную почту",
                            pattern: {
                              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                              message: "Пожалуйста, введите правильную электронную почту"
                            }
                          })}
                        />
                        {errors.email && <span className="delivery-screen__error-message">{errors.email.message}</span>}
                      </Form.Group>
                      <Form.Group className="text-center" controlId="phone">
                        <Form.Label>Телефон</Form.Label>
                        <Form.Control
                          type="phone"
                          placeholder="Ваш телефон"
                          {...register("phone", {
                            required: "Пожалуйста, введите Ваш телефон",
                            pattern: {
                              value: /^((\+7|7|8)+([0-9]){10})$/,
                              message: "Пожалуйста, введите правильный телефон"
                            }
                          })}
                        />
                        {errors.phone && <span className="delivery-screen__error-message">{errors.phone.message}</span>}
                      </Form.Group>
                    </div>
                </Card.Body>
              </Card>
          </Col>
          <Col md={4}>
          <Card className=''>
              <Card.Body className='delivery-screen__card--body'>
                <Card.Title className='mb-3'>Дополнительно</Card.Title>
                <Card.Subtitle></Card.Subtitle>
                <div>
                  <textarea
                  type="text"
                  rows="5"
                  cols="25"
                  placeholder='Ваши комментарии, пожелания и дополнения к заказу'
                  {...register("commentary")} />
                </div>
              </Card.Body>
            </Card>
            </Col>
          </Row>
          <Row className='m-5'>
            <Col className='text-center'>
             <CustomButton type="submit">
                Оформить заказ
             </CustomButton>
            </Col>
          </Row>
      </Form>
    )}
    </section>
  )
}

export default DeliveryScreen;