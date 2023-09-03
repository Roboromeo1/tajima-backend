import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Table,
  Form,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { useGetColorSetQuery } from "../slices/colorSetsApiSlice";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { addToCart } from "../slices/cartSlice";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [colorQtys, setColorQtys] = useState({});
  const [searchColor, setSearchColor] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [customColors, setCustomColors] = useState([]);
  const [showCustomColors, setShowCustomColors] = useState(false);
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
  };
  const addColorToCartHandler = (color) => {
    const colorQty = colorQtys[color.name] || 1;
    dispatch(addToCart({ ...product, color, qty: colorQty }));
    toast.success(`Added ${color.name} to the cart!`);
  };

  const [customRowOpen, setCustomRowOpen] = useState(false);

  const addCustomRow = () => {
    setCustomRowOpen(true);
  };
  const [localFilteredColors, setLocalFilteredColors] = useState([]);
  const handleColorCodeChange = (index, newValue) => {
    const newColorObject = { ...filteredColors[index], name: newValue };
    const newFilteredColors = [
      ...filteredColors.slice(0, index),
      newColorObject,
      ...filteredColors.slice(index + 1),
    ];

    setLocalFilteredColors(newFilteredColors);
  };

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);
  const colorSetId = product?.colorSet;
  const {
    data: colorSet,
    isLoading: isLoadingColorSet,
    isError: isErrorColorSet,
  } = useGetColorSetQuery(colorSetId);
  const deleteCustomColorHandler = (index) => {
    const updatedCustomColors = [...customColors];
    updatedCustomColors.splice(index, 1);
    setCustomColors(updatedCustomColors);
    toast.warning(`Removed custom color!`);
  };

  const filteredColors = searchColor
    ? colorSet?.colors.filter((color) =>
        color.name.toLowerCase().includes(searchColor.toLowerCase())
      )
    : colorSet?.colors;

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta title={product.name} description={product.description} />
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          {colorSet && (
            <Row className="my-5">
              <Col md={12}>
                <h3>Colour Code:</h3>
                <Form.Control
                  type="text"
                  placeholder="Search by Colour Code"
                  style={{ width: "200px" }}
                  value={searchColor}
                  onChange={(e) => setSearchColor(e.target.value)}
                />
                <Table striped bordered hover className="mt-3">
                  <thead>
                    <tr>
                      <th>Color</th>
                      <th>Color Code</th>
                      <th>QTY</th>
                      <th>Add to List</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoadingColorSet ? (
                      <tr>
                        <td>Loading...</td>
                      </tr>
                    ) : isErrorColorSet ? (
                      <tr>
                        <td>Error loading color set</td>
                      </tr>
                    ) : (
                      filteredColors
                        .slice(
                          (currentPage - 1) * itemsPerPage,
                          currentPage * itemsPerPage
                        )
                        .map((color, index) => (
                          <tr key={index}>
                            <td
                              style={{
                                backgroundColor: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`,
                              }}
                            ></td>
                            <td>{color.name}</td>
                            <td>
                              <Form.Control
                                type="number"
                                style={{ width: "80px" }}
                                onChange={(e) =>
                                  setColorQtys({
                                    ...colorQtys,
                                    [color.name]: Number(e.target.value),
                                  })
                                }
                              />
                            </td>
                            <td>
                              <Button
                                variant="primary"
                                onClick={() => addColorToCartHandler(color)}
                              >
                                Add to List
                              </Button>
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </Table>
                <Row className="mt-3">
                  <Col>
                    <Button
                      variant="primary"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Previous
                    </Button>
                    <span className="mx-2">{currentPage}</span>
                    <Button
                      variant="primary"
                      disabled={
                        currentPage * itemsPerPage >= filteredColors?.length
                      }
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Next
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
          {colorSet && (
            <>
              {/* Existing color code table */}
              <Row className="my-5">
                <Col md={12}>
                  <Button
                    variant="primary"
                    onClick={() => setShowCustomColors(!showCustomColors)}
                  >
                    Add Colors from ColorChart
                  </Button>
                </Col>
              </Row>
              {showCustomColors && (
                <Row className="my-5">
                  <Col md={12}>
                    <h3>Add Custom Colors:</h3>
                    <Table striped bordered hover className="mt-3">
                      <thead>
                        <tr>
                          <th>Color</th>
                          <th>Color Code</th>
                          <th>QTY</th>
                          <th>Add to List</th>
                          <th>Delete</th> {/* New Delete Column Header */}
                        </tr>
                      </thead>
                      <tbody>
                        {customColors.map((customColor, index) => (
                          <tr key={index}>
                            <td>
                              <Button
                                variant="primary"
                                onClick={() =>
                                  addColorToCartHandler(customColor.color)
                                }
                              >
                                Add to List
                              </Button>
                            </td>
                            <td>
                              {" "}
                              {/* New Delete Button */}
                              <Button
                                variant="danger"
                                onClick={() => deleteCustomColorHandler(index)}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              )}
            </>
          )}
          {showCustomColors && (
            <Row className="my-5">
              <Col md={12}>
                <Button variant="primary" onClick={addCustomRow}>
                  Add Custom Row
                </Button>
                {customRowOpen && (
                  <Table striped bordered hover className="mt-3">
                    <thead>
                      <tr>
                        <th>Color</th>
                        <th>Color Code</th>
                        <th>QTY</th>
                        <th>Add to List</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoadingColorSet ? (
                        <tr>
                          <td>Loading...</td>
                        </tr>
                      ) : isErrorColorSet ? (
                        <tr>
                          <td>Error loading color set</td>
                        </tr>
                      ) : (
                        filteredColors
                          .slice(
                            (currentPage - 1) * itemsPerPage,
                            currentPage * itemsPerPage
                          )
                          .map((color, index) => (
                            <tr key={index}>
                              <td
                                style={{
                                  backgroundColor: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`,
                                }}
                              ></td>
                              <td>
                                <input
                                  type="text"
                                  onChange={(e) =>
                                    handleColorCodeChange(index, e.target.value)
                                  }
                                />
                              </td>
                              <td>
                                <Form.Control
                                  type="number"
                                  style={{ width: "80px" }}
                                  onChange={(e) =>
                                    setColorQtys({
                                      ...colorQtys,
                                      [color.name]: Number(e.target.value),
                                    })
                                  }
                                />
                              </td>
                              <td>
                                <Button
                                  variant="primary"
                                  onClick={() => addColorToCartHandler(color)}
                                >
                                  Add to List
                                </Button>
                              </td>
                            </tr>
                          ))
                      )}
                    </tbody>
                  </Table>
                )}
              </Col>
            </Row>
          )}
        </>
      )}
    </>
  );
};

export default ProductScreen;
