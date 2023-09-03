
import React from 'react';

const Sidebar = ({ setCategory, setPriceRange }) => {
  return (
    <div>
      <h3>Filter Products</h3>
      <div>
      <br></br>
      <div>
        <label>Filter By Price:</label><br></br>
        <input type="range" onChange={(e) => setPriceRange(e.target.value)} />
      </div>
      <br></br>
        <label>Category:</label>
        <ul>
          <li onClick={() => setCategory('')}>All</li>
          <li onClick={() => setCategory('Maidera')}>Maidera</li>
          <li onClick={() => setCategory('Consumables')}>Consumables</li>
          <li onClick={() => setCategory('Consumables')}>Heat Presses</li>
          <li onClick={() => setCategory('Consumables')}>Pulse</li>
          <li onClick={() => setCategory('Consumables')}>Seit Laser</li>
          {/* Add more categories as needed */}
        </ul>
      </div>
   
    </div>
  );
};

export default Sidebar;
