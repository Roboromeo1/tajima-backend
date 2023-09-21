import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Row, Col, ListGroup, Image, Card, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';
import { getShippingCharges } from '../utils/shippingUtil';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const [shippingCharges, setShippingCharges] = useState([]);

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    calculateWeight();

    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const calculateShipping = async (weight) => {
    const charges = await getShippingCharges(cart.shippingAddress.postalCode);

    setShippingCharges(charges);
  }

  const calculateWeight = () => {
    let weight = 0;
    cart.cartItems.map((item, index) => (weight =  weight + (item.qty * item.weight)));
    calculateShipping(weight);
  }


  const dispatch = useDispatch();
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: shippingCost,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err.message); 
    }
  };

  const [shippingCost, setShippingCost] = useState(0);

  const handleShippingChange = (e) => {
    setShippingCost(e.target.value);
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={3}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                        <Col md={1}>
                        {item.qty} x ${item.weight}Kg = ${item.qty * item.weight}Kg
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary???</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {shippingCharges && (
                  <div>
                    <h4>Select Shipping</h4>
                    <div>
                      <input
                        type="radio"
                        id="premium"
                        name="shippingOption"
                        value={shippingCharges.premium}
                        onChange={handleShippingChange}
                      />
                      <label htmlFor="premium">
                        Premium (${shippingCharges.premium})
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="standard"
                        name="shippingOption"
                        value={shippingCharges.standard}
                        onChange={handleShippingChange}
                      />
                      <label htmlFor="standard">
                        Standard (${shippingCharges.standard})
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="economy"
                        name="shippingOption"
                        value={shippingCharges.economy}
                        onChange={handleShippingChange}
                      />
                      <label htmlFor="economy">
                        Economy (${shippingCharges.economy})
                      </label>
                    </div>
                  </div>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingCost}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
            
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
              {error && <Message variant='danger'>{error.message}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems === 0 || shippingCost === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
