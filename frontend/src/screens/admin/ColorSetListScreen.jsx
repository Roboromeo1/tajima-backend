import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Table, Form } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import {
  useGetColorSetsQuery,
  useDeleteColorSetMutation,
  useCreateColorSetMutation,
} from '../../slices/colorSetsApiSlice';

const ColorSetListScreen = () => {
  const [name, setName] = useState('');
  const { data: colorSets, isLoading, error } = useGetColorSetsQuery();
  const [deleteColorSet] = useDeleteColorSetMutation();
  const [createColorSet, { isLoading: loadingCreate, error: errorCreate }] = useCreateColorSetMutation();
  
  const navigate = useNavigate();

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this color set?')) {
      deleteColorSet(id);
    }
  };

  const createHandler = async (e) => {
    e.preventDefault();
    const colorSetData = {
      name,
      colors: [],
    };
    try {
      await createColorSet(colorSetData);
      toast.success('ColourSet created');
      setName('');
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return (
    <>
      <h1>ColourSets</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {colorSets.map((colorSet) => (
              <tr key={colorSet._id}>
                <td>{colorSet._id}</td>
                <td>{colorSet.name}</td>
                <td>
                  <Link to={`/colourSetsList/${colorSet._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </Link>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(colorSet._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <h1>Create ColourSet</h1>
      {loadingCreate && <Loader />}
      {errorCreate ? (
        <Message variant='danger'>{errorCreate}</Message>
      ) : (
        <Form onSubmit={createHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>
            Create
          </Button>
        </Form>
      )}
    </>
  );
};

export default ColorSetListScreen;
