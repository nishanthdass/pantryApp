import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

export const AddItemTable = () => {

    const [item, setItem] = useState('');
    const [quantity, setQuantity] = useState('');

    const navigate = useNavigate()()

    const addItem = async () => {
        console.log(item)
        
        navigate("/");
    }; 

    return (
    <tr>
      <td>
        <input
          type="text"
          placeholder="Enter title here"
          value={item}
          onChange={e => setItem(e.target.value)}
        />
      </td>
      <td>
        <input
          type="number"
          value={quantity}
          placeholder="Enter quantity here"
          onChange={e => setQuantity(e.target.value)}
        />
      </td>
      <td>
        <button>Add</button>
      </td>
    </tr>
    );
}

export default AddItemTable;