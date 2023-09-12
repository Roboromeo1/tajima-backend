import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Sidebar from '../components/SideBar'; 

const ShopScreen = () => {
  console.log("Nitish screens shopscreen.jsx")
  
  // -----------replace by funcion and contian filtered data inside it----
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  

  // Update the API query to include filtering parameters
  const { data, isLoading, error } = useGetProductsQuery({
    category,
    priceRange,
  });

  const [all_products, setall_products]=useState()
  console.log(data)

  
  // ---------function for filter data by category----
  const filter_category= (category_name)=>{
    console.log(category_name)
    if(category_name=="all"){
      console.log("all items appear hare")
      setall_products(data.products)
    }else{
      const filter_data=data.products.filter(curEle=>curEle.category === category_name)
      // console.log(filter_data)
      setall_products(filter_data)
    }
  }
  console.log(all_products)




  return (
    <>
      <Row>
        <Col md={3}>
          <Sidebar filter_category={filter_category} setPriceRange={setPriceRange} />
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
                {
                  all_products ? <>
                  { all_products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
                  </>:<>
                  {data.products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
                  </>
                }
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
