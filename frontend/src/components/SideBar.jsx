import React, { useState } from 'react';

const Sidebar = ({setselect_Price_range, filter_category, max_price, filter_by_range }) => {
  const [select_Price, setselect_price]=useState("")
  setselect_Price_range(select_Price)
  // console.log(select_Price)
  return (
    <div>
      <h3>Filter Products</h3>
      <div>
      <br></br>
      <div>
        <label>Filter By Price:</label><br></br>
        <h3>{select_Price}</h3>
        <input type="range" value={select_Price} onChange={(e) => setselect_price(e.target.value)} id="points" name="points" min="0" max={max_price}></input>
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
