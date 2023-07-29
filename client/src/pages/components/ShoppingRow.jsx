import React, { useState } from 'react';

function ShoppingRow({ useritem, onAddItem, onDelItem, onMoveItem }) {
    const [item, setItem] = useState(useritem.item);
    const [quantity, setQuantity] = useState(useritem.quantity);
    const [unit, setUnit] = useState(useritem.unit);

    const handleItemChange = (e) => {
        setItem(e.target.value);
    };

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const handleUnitChange = (e) => {
        setUnit(e.target.value);
    };

    const delItem = async (itemId) => {
        onDelItem(itemId)
    }; 

    const moveItem = async (itemId) => {
        onMoveItem(itemId)
    }; 

    return (
        <tr className='itemrow'>
            <td>
                <input type="text" value={item} onChange={handleItemChange} />
            </td>
            <td>
                <input type="text" value={quantity} onChange={handleQuantityChange} />
            </td>
            <td>
                <input type="text" value={unit} onChange={handleUnitChange} />
            </td>
            <td>
                <div className="button-container">
                    <button onClick={()=>delItem(useritem._id)}>Delete</button>
                    <button onClick={()=>moveItem(useritem._id)}>Purchased</button>
                </div>
            </td>
        </tr>
    );
}

export default ShoppingRow;
