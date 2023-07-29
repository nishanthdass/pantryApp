import React, { useState } from 'react';
import { items } from '../../data/items';
import axios from 'axios';
import _ from 'lodash';
import Dropdown from './Dropdown';


export const AddItemTable = (props) => {

    const [item, setItem] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('');

    const [drop, setDrop] = useState(false)
    const [dropdownData, setDropdownData] = useState([]);

    const ingerdientsReq = _.debounce(async(item) => {
      try {
        const requestData = { item: item };
        const response = await axios.post(
          "http://localhost:5000/shopping-additem-getIngredients",requestData, {
                  headers: {'Content-Type': 'application/json'}}); 
        setDropdownData(response.data)
      }
      catch(error) {
        console.log('Error finding item:', error);
      }
    }, 500)

    const handleInputChange = (e) => {
      const newValue = e.target.value;
      setItem(newValue);
      ingerdientsReq(newValue);
      if (newValue.length > 1 && dropdownData.length >= 0) {
        setDrop(true);
      } else {
        setDrop(false);
      }
    };

    const handleInputBlur = () => {
      setTimeout(() => {
        setDrop(false);
      }, 350); // Use a timeout to give enough time to click on the dropdown
    };
  
    const handleInputFocus = () => {
      setDrop(true);
    };



    const addItem = async () => {
        console.log(item, quantity, unit)
        props.onAddItem(item, quantity, unit)
        setItem('')
        setQuantity('')
        setUnit('')
    }; 

    return (
    <tr className='table-row'>
      <td>
        <div className='table-cell'>
        <input
          type="text"
          placeholder="Enter Item here"
          value={item}
          onClick={handleInputChange}
          onChange={handleInputChange}
          onBlur={(handleInputBlur)}
          //onFocus={handleInputFocus}
        /> 
        {drop && (
          <Dropdown item = {dropdownData} setSelectedValue={setItem} setDropValue={setDrop}/>
        )}
       </div>
      </td>
      <td>
        <div className='table-cell'>
        <input className='table-input'
          type="number"
          value={quantity}
          placeholder="Enter quantity here"
          onChange={e => setQuantity(e.target.value)}
        />
        </div>
      </td>
      <td>
        <div className='table-cell'>
        <input className='table-input'
          type="text"
          value={unit}
          placeholder="Enter unit here"
          onChange={e => setUnit(e.target.value)}
        />
        </div>
      </td>
      <td>
        <button onClick={addItem}>Add</button>
      </td>
    </tr>
    );
}

export default AddItemTable;