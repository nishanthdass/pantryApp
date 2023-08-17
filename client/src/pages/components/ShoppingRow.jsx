import React, { useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
import Dropdown from './Dropdown';

function ShoppingRow({ useritem, onAddItem, onDelItem, onMoveItem }) {
    const [item, setItem] = useState(useritem.item);
    const [quantity, setQuantity] = useState(useritem.quantity);
    const [unit, setUnit] = useState(useritem.unit);
    const [rowId, setRowId] = useState(useritem.rowId)

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

    const handleItemChange = (e) => {
        setItem(e.target.value);
    };

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const handleUnitChange = (e) => {
        setUnit(e.target.value);
    };

    const addItem = async () => {
        onAddItem(rowId, item, quantity, unit)

    }; 

    const delItem = async (itemId) => {
        onDelItem(itemId)
        setItem('')
        setQuantity('')
        setUnit('')
    }; 

    const moveItem = async (itemId, rowId) => {
        onMoveItem(itemId, rowId)
        setItem('')
        setQuantity('')
        setUnit('')
    }; 

    return (
        <tr className='table-row'>
            <td>
            <div className='table-cell'>
                <input type="text" 
                value={item} 
                onClick={handleInputChange}
                onChange={handleInputChange} 
                onBlur={(handleInputBlur)} />
                {drop && (
                <Dropdown item = {dropdownData} setSelectedValue={setItem} setDropValue={setDrop}/>
                )}
            </div>
            </td>
            
            <td>
                <input type="text" value={quantity} onChange={handleQuantityChange} />
            </td>
            <td>
                <input type="text" value={unit} onChange={handleUnitChange} />
            </td>
            <td>
                <div className="button-container">
                    <button onClick={addItem}>Add</button>
                    <button onClick={()=>delItem(useritem._id)}>Delete</button>
                    <button onClick={()=>moveItem(useritem._id, useritem.rowId)}>Purchased</button>
                </div>
            </td>
        </tr>
    );
}

export default ShoppingRow;
