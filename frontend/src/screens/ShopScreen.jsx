import React, { useEffect, useLayoutEffect, useState } from 'react';
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
  const [max_price, setmaxPrice] = useState("");
  const [select_Price_range, setselect_Price_range] = useState("")
  

  // Update the API query to include filtering parameters
  const { data, isLoading, error } = useGetProductsQuery({
    category,
    priceRange,
  });

  const [all_products, setall_products]=useState(null)

  const [price_range_data,set_price_renge_data]=useState(data)
  
  // console.log(data)

  
  // ---------function for filter data by category----
  const filter_category= (category_name)=>{
    // console.log(category_name)
    if(category_name=="all"){
      // console.log("all items appear hare")
      setall_products(data.products)
    }else{
      const filter_data=data?.products?.filter(curEle=>curEle.category === category_name)
      // console.log(filter_data)
      setall_products(filter_data)
    }
  }

 
  // -------------finding max price----------------
  const filter_by_range=(range)=>{
    const fiding_max_price=data?.products?.map((curEle)=>{
      return curEle.price
    })
    // console.log(fiding_max_price)
    setmaxPrice(Math.max(...fiding_max_price))
  }


  console.log(`this is price range user finding ${select_Price_range}`)


  // ----------as per the price range filtering data--------
  const finding_data_by_price=()=>{
    if(all_products !==null){
      console.log("price filter form products")
      const filter_by_price=all_products.filter(curEle=>curEle.price <= select_Price_range)
      setall_products(filter_by_price)
      console.log(filter_by_price)
    }else{
      console.log("price filter form data")
      const filter_by_price=data?.products?.filter(curEle=>curEle.price <= select_Price_range)
      setall_products(filter_by_price)
    }
  }

  useEffect(()=>{
    finding_data_by_price()
  },[select_Price_range])


  console.log(`its working ${all_products}`)

  return (
    <>
      <Row>
        <Col md={3}>
          <Sidebar setselect_Price_range={setselect_Price_range} filter_category={filter_category} max_price={max_price} filter_by_range={filter_by_range} />
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
                  { all_products?.map((product) => (
                  <Col key={product?._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
                  </>:<>
                  {data?.products?.map((product) => (
                  <Col key={product?._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
                  </>
                }
              </Row>
              <Paginate pages={data?.pages} page={data?.page} />
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ShopScreen;
