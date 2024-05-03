import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Card, Button } from 'react-bootstrap';
import { useGetProductDetailsQuery } from '../../slices/productsApiSlice';
import { setProductId, setProductName, setTastings, setTPrice, setOrderWeight, setOrderPrice, setProductComments } from '../../slices/orderSlice';  
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import { tastings } from '../TastingsScreen/allTastings';
import CustomButton from '../../components/CustomButton/CustomButtom';
import LeftArrow from '../../../../public/assets/icons/LeftArrow';
import Minus from '../../../../public/assets/icons/Minus';
import Plus from '../../../../public/assets/icons/Plus';
import './OrderScreen.css';

const OrderScreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);


  // <--- Сброс веса, начинок и комментариев, если выбран другой продукт --->

  const currentProductId = useSelector((state) => state.order.productId);

  useEffect(() => {
    if (productId !== currentProductId) {
      dispatch(setProductId(productId));
      dispatch(setOrderWeight(product?.weightOnPhoto));
      dispatch(setTastings({}));
      dispatch(setTPrice(0));
      dispatch(setProductComments(''));
    }
  }, [product]);

  // <--- Выбор веса --->

  const [productWeight, setProductWeight] = useState(product?.weightOnPhoto);
  const currentProductWeight = useSelector((state) => state.order.orderWeight);

  useEffect(() => {
    if (product) {
      setProductWeight(product.weightOnPhoto);
    }
  }, [product]);

  useEffect(() => {
    setProductWeight(currentProductWeight);
  }, [currentProductWeight]);

  function handleIncrement() {
    const newWeight = productWeight + 1;
    setProductWeight(newWeight);
    dispatch(setOrderWeight(newWeight));
  }
    
  function handleDecrement() {
    const newWeight = productWeight <= 2 ? 2 : productWeight - 1;
    setProductWeight(newWeight);
    dispatch(setOrderWeight(newWeight));
  }
  
  // <--- Выбор начинок --->
  const currentTastings = useSelector((state) => state.order.selectedTastings);

  const [selectedTastingsByTier, setSelectedTastingsByTier] = useState({});

  useEffect(() => {
    const initialTastingsByTier = {};
    for (let i = 0; i < product?.tiers; i++) {
      initialTastingsByTier[i] = currentTastings[i] || undefined;
    }
    setSelectedTastingsByTier(initialTastingsByTier);
  }, [product?.tiers, currentTastings]);
  
  const [tastingsPrice, setTastingsPrice] = useState(0);

  const tiersToWeightRatio = {
    1: [100],
    2: [65, 35],
    3: [55, 30, 15],
    4: [45, 25, 20, 10],
  };

  const handleSelectTasting = (tier, tasting) => {
    setSelectedTastingsByTier(prevSelectedTastingsByTier => ({
      ...prevSelectedTastingsByTier,
      [tier]: tasting
    }));
  };

  const calculateWeights = () => {
    if (!product || !product.tiers) {
      return [];
    }
    const weightPercentage = tiersToWeightRatio[product.tiers];
    let tierWeights = [];
    for (let i = 0; i < product.tiers; i++) {
      const tierWeight = (productWeight / 100) * weightPercentage[i];
      tierWeights.push(tierWeight);
    }
    return tierWeights;
  };
  
  const [tierWeights, setTierWeights] = useState(calculateWeights() || []);

  useEffect(() => {
    if (product && product.tiers) {
      setTierWeights(calculateWeights());
    }
  }, [product, productWeight]);

  const calculateAdditionalPrice = (tasting, weight) => {
    if (tasting.tastingPrice === 0) {
      return 0;
    }
    const additionalPrice = tasting.tastingPrice * weight;
    return additionalPrice;
  };

  useEffect(() => {
    let totalTastingsPrice = 0;
    Object.values(selectedTastingsByTier).forEach((tasting, index) => {
      if (tasting && tasting.tastingPrice > 0) {
        totalTastingsPrice += tierWeights[index] * tasting.tastingPrice;
      }
    });
    setTastingsPrice(totalTastingsPrice);
  }, [selectedTastingsByTier, tierWeights]);

  // <--- Подсчет цены --->

  const totalPrice = useMemo(() => {
    return (productWeight * product?.price) + product?.decorPrice + tastingsPrice;
  }, [productWeight, product?.price, product?.decorPrice, tastingsPrice]);
  
  // <--- Сохранение комментария пользователя --->

  const currentProductComments = useSelector((state) => state.order.productComments);
  const [userComments, setUserComments] = useState(currentProductComments);

  useEffect(() => {
    setUserComments(currentProductComments);
  }, [currentProductComments]);

  const handleTextareaChange = (event) => {
    setUserComments(event.target.value);
  };

  // <--- Обработка заказа в state --->
  const isTastingsSelected = Object.values(selectedTastingsByTier).every(tasting => tasting && tasting !== undefined);

  const OrderHandler = () => {
  // Проверка, выбраны ли начинки для всех ярусов

  if (!isTastingsSelected) {
    // Если не все ярусы имеют выбранные начинки, выполните действие по вашему усмотрению.
    // Например, покажите сообщение об ошибке или выполните другую логику.
    alert('Пожалуйста, выберите начинки для всех ярусов торта.');
    return;
  }

  dispatch(setProductId(productId));
  dispatch(setProductName(product.name));
  dispatch(setOrderWeight(productWeight));
  dispatch(setTastings(selectedTastingsByTier));
  dispatch(setTPrice(tastingsPrice));
  dispatch(setOrderPrice(Number((productWeight * product.price) + product.decorPrice + tastingsPrice)));
  dispatch(setProductComments(userComments));
  navigate(`/product/${productId}/delivery`);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <section>
          <div className='order-screen__nav-row'>
            <div className='order-screen__nav-row--back-button'>
              <Link className='btn my-3' to={`/product/${productId}`}>
                <LeftArrow />
              </Link>
            </div>
            <div>

            </div>
          </div>
          <Row className='mb-5'>
            <Col md={4}>
              <Card>
                <Card.Body className='order-screen-card'>
                  <Card.Title>
                    &quot;{product.name}&quot;
                  </Card.Title>
                  <Card.Subtitle className='p-1'>
                    {product.price} руб/кг.
                  </Card.Subtitle>
                  {product.decorPrice > 0 ?
                    <Card.Subtitle className='p-1'>Декор - {product.decorPrice} руб.</Card.Subtitle> 
                    :
                    <Card.Subtitle className='p-1'>Декор включен в стоимость.</Card.Subtitle> 
                  }
                  <h6>Вес торта на фото - {product.weightOnPhoto} кг.</h6>
      
                  <div className='order-screen-card__productWeightSelector'>
                    <Button className='order-screen__weight-button' variant='' onClick={handleDecrement}>
                      <Minus />
                    </Button>
                    <span>
                      {productWeight} кг.
                    </span>              
                      <Button className='order-screen__weight-button' variant='' onClick={handleIncrement}>
                        <Plus />
                    </Button>
                    <span>
                      {Math.ceil((productWeight * 1000) / 200)} гостей.
                    </span>  
                  </div>

                  <Card.Img className='order-screen-card__image' variant="top" src={product.imgUrl} alt={product.imgAlt} />

                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body className='order-screen__tasting-selector tasting-selector'>
                  <Card.Title>
                    Выбор начинок:
                  </Card.Title>
                  {[...Array(product.tiers).keys()].reverse().map((tier) => (
                    <div key={tier} className='tasting-wrap'>
                      <button
                        type="button"
                        className="tasting-form-button"
                        onClick={() => handleSelectTasting(tier, null)}
                      >
                        {selectedTastingsByTier[tier] ? 
                        (
                          <>
                            <div>
                              {`${tier + 1} ярус: ${selectedTastingsByTier[tier].name}`}
                            </div>
                            <div>
                              {`Вес: ${tierWeights[tier].toFixed(1)} кг`}
                            </div>
                              {selectedTastingsByTier[tier].tastingPrice > 0 && (
                                <span>Доплата за начинку: {calculateAdditionalPrice(selectedTastingsByTier[tier], tierWeights[tier]).toFixed(0)} руб.</span>
                              )}
                          </>
                        ) : 
                        (
                          <>
                            {`Выберите начинку для ${tier + 1} яруса`}
                          </>
                        )}
                      </button>
                      {selectedTastingsByTier[tier] === null && (
                        <div className="order-screen__tasting-selector-tastings tasting-container mb-2">
                          {tastings.map((tasting) => (
                            <button
                              type='button'
                              className="tasting-item"
                              key={tasting.name}
                              onClick={() => handleSelectTasting(tier, tasting)}
                            >
                              <img src={tasting.miniImage} alt={tasting.name} className="tasting-image" />
                              <div className="tasting-name">
                                {tasting.name}
                                {tasting.tastingPrice > 0 ? 
                                <div>+{tasting.tastingPrice} руб/кг</div>
                                :
                                null
                                }
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col className='order-screen__price-info mb-3'>
                        <strong>
                          Цена - {Number(totalPrice)} рублей
                        </strong>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='order-screen__price-info mb-3'>
                        <ListGroup className='text-center'>
                          {product.decorPrice ?
                            <ListGroup.Item>
                              {product.decorType} - {product.decorPrice} руб.
                            </ListGroup.Item>
                          :
                            null
                          }
                          {tastingsPrice ?
                            <ListGroup.Item>
                              Доплата за начинки - {tastingsPrice.toFixed(0)} руб.
                            </ListGroup.Item>
                          :
                            null
                          }
                          <ListGroup.Item>
                              Доставка не включена в стоимость торта.
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <div>
                              <textarea
                              className='order-screen__client-wishes'
                              type="text"
                              rows="3"
                              cols="27"
                              placeholder='Ваши пожелания к дизайну торта'
                              value={userComments}
                              onChange={handleTextareaChange}
                              />
                            </div>
                          </ListGroup.Item> 
                        </ListGroup>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
                <div className='text-center m-3'>
                  <CustomButton
                    onClick={OrderHandler}
                  >
                    Перейти к доставке
                  </CustomButton>
                </div>
              </Card>
            </Col>
          </Row>
        </section>
      )}
    </>
  );
};

export default OrderScreen;