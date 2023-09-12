import React from 'react';

const Sidebar = ({ filter_category, setPriceRange }) => {
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
          <li style={{cursor:'pointer'}} onClick={() => filter_category('all')}>All</li>
          <li style={{cursor:'pointer'}} onClick={() => filter_category('Maidera')}>Maidera</li>
          <li style={{cursor:'pointer'}} onClick={() => filter_category('Consumables')}>Consumables</li>
          <li style={{cursor:'pointer'}} onClick={() => filter_category('Heat Presses')}>Heat Presses</li>
          <li style={{cursor:'pointer'}} onClick={() => filter_category('Pulse')}>Pulse</li>
          <li style={{cursor:'pointer'}} onClick={() => filter_category('Seit Laser')}>Seit Laser</li>
          {/* Add more categories as needed */}
        </ul>
      </div>
   
    </div>
  );
};

export default Sidebar;
