import React, { useState } from 'react';
import PantryRow from './PantryRow';
import { useNavigate } from 'react-router-dom';
import { SelectDrop } from './Select';

function PantryTable({ pantrys }) {
  const [pantry, setPantry] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');



  return (
    <div>
      <table className="items-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {pantrys.map((pantry, i) => (
            <PantryRow pantry={pantry} key={i} />
          ))}
         
        </tbody>
      </table>
    </div>
  );
}

export default PantryTable;


