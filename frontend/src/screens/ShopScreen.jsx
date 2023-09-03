import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Sidebar from '../components/SideBar'; 

const ShopScreen = () => {
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');

  // Update the API query to include filtering parameters
  const { data, isLoading, error } = useGetProductsQuery({
    category,
    priceRange,
  });

  return (
    <>
      <Row>
        <Col md={3}>
          <Sidebar setCategory={setCategory} setPriceRange={setPriceRange} />
        </Col>
        <Col md={9}>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>
              {error?.data?.message || error.error}
            </Message>
          ) : (
            <>
              <h1>Products</h1>
              <Row>
                {data.products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
              <Paginate pages={data.pages} page={data.page} />
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ShopScreen;
