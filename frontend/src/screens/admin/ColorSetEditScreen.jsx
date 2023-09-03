import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Table } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
  useGetColorSetQuery,
  useUpdateColorSetMutation,
} from '../../slices/colorSetsApiSlice';

const ColorSetEditScreen = () => {
  const { id: colorSetId } = useParams();
  const [name, setName] = useState('');
  const [colors, setColors] = useState([]);
  const [csvContent, setCsvContent] = useState('');

  const { data: colorset, isLoading, error, refetch } = useGetColorSetQuery(colorSetId);

  const [updateColorSet, { isLoading: loadingUpdate }] = useUpdateColorSetMutation();

  const navigate = useNavigate();

  const handleCsvPaste = () => {
    const lines = csvContent.split('\n'); // Adjust the line number as needed
    const newColors = lines.map((line) => {
      const columns = line.split('\t');
      return {
        name: columns[0],
        rgb: {
          r: Number(columns[5]),
          g: Number(columns[6]),
          b: Number(columns[7]),
        },
      };
    })
      .filter((color) => color.name && !isNaN(color.rgb.r) && !isNaN(color.rgb.g) && !isNaN(color.rgb.b)); // Filter out invalid colors

    setColors([...colors, ...newColors]);
    setCsvContent('');
  };

  const handleColorChange = (index, field, value) => {
    const newColors = [...colors];
    newColors[index][field] = value;
    setColors(newColors);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    for (const color of colors) {
      if (!color.name || isNaN(color.rgb.r) || isNaN(color.rgb.g) || isNaN(color.rgb.b)) {
        toast.error('All colors must have a name and RGB values.');
        return;
      }
    }

    const colorSetData = {
      id: colorSetId,
      name,
      colors,
    };

    try {
      await updateColorSet(colorSetData);
      toast.success('ColourSet updated');
      refetch();
      navigate('/admin/colorsetsList');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (colorset && colorset.colors) {
      setName(colorset.name);
      setColors(colorset.colors);
    }
  }, [colorset]);

  return (
    <>
      <Link to='/admin/colorsetsList' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit ColourSets</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='csvContent'>
              <Form.Label>Paste CSV Content to Bulk Upload Colors</Form.Label>
              <Form.Control
                as='textarea'
                rows={5}
                placeholder='Paste CSV content here'
                value={csvContent}
                onChange={(e) => setCsvContent(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button onClick={handleCsvPaste} variant='secondary'>Add More Colors</Button>

            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>RED</th>
                  <th>GREEN</th>
                  <th>BLUE</th>
                  <th>COLOR</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {colors.map((color, index) => (
                  <tr key={index}>
                    <td>
                      <Form.Control
                        type='text'
                        placeholder='Enter color name'
                        value={color.name}
                        onChange={(e) => handleColorChange(index, 'name', e.target.value)}
                      ></Form.Control>
                    </td>
                    <td>
                      <Form.Control
                        type='number'
                        placeholder='Enter red value'
                        value={color.rgb.r}
                        onChange={(e) => handleColorChange(index, 'rgb.r', Number(e.target.value))}
                      ></Form.Control>
                    </td>
                    <td>
                      <Form.Control
                        type='number'
                        placeholder='Enter green value'
                        value={color.rgb.g}
                        onChange={(e) => handleColorChange(index, 'rgb.g', Number(e.target.value))}
                      ></Form.Control>
                    </td>
                    <td>
                      <Form.Control
                        type='number'
                        placeholder='Enter blue value'
                        value={color.rgb.b}
                        onChange={(e) => handleColorChange(index, 'rgb.b', Number(e.target.value))}
                      ></Form.Control>
                    </td>
                    <td style={{ backgroundColor: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})` }}></td>
                    <td>
                      <Button
                        type='button'
                        variant='danger'
                        onClick={() => {
                          const newColors = colors.filter((_, i) => i !== index);
                          setColors(newColors);
                        }}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ColorSetEditScreen;


