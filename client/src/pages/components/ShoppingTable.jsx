import React, { useState } from 'react';
import ShoppingRow from './ShoppingRow';
import { useNavigate } from 'react-router-dom';
import { SelectDrop } from './Select';

function ShoppingTable({ items }) {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');

  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const options = [
    { value: 'option1', label: 'Apple' },
    { value: 'option1', label: 'Apple Cider Vinegar' },
    { value: 'option1', label: 'Apple Juice' },
    { value: 'option1', label: 'Appletini' },
    { value: 'option2', label: 'Apricot' },
    { value: 'option3', label: 'etc' },
    // Add more options as needed
  ];

  const addItem = async () => {
    console.log(item);
    navigate('/shopping');
  };

  return (
    <div>
      <table className="items-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <ShoppingRow item={item} key={i} />
          ))}
          <tr>
            <td>
              <SelectDrop options={options} onChange={handleChange} />
            </td>
            <td>
              <input
                type="number"
                value={quantity}
                placeholder="Enter quantity here"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                value={unit}
                placeholder="Enter unit here"
                onChange={(e) => setUnit(e.target.value)}
              />
            </td>
            <td>
              <button onClick={addItem}>Add to list</button>
            </td>
            
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ShoppingTable;


