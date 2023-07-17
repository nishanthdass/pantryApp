import React, { useState } from 'react';

function ShoppingRow({ item }) {
    const [myitem, setItem] = useState(item.name);
    const [quantity, setQuantity] = useState(item.quantity);
    const [unit, setUnit] = useState(item.unit);

    const handleItemChange = (e) => {
        setItem(e.target.value);
    };

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const handleUnitChange = (e) => {
        setUnit(e.target.value);
    };

    return (
        <tr className='itemrow'>
            <td>
                <input type="text" value={myitem} onChange={handleItemChange} />
            </td>
            <td>
                <input type="text" value={quantity} onChange={handleQuantityChange} />
            </td>
            <td>
                <input type="text" value={unit} onChange={handleUnitChange} />
            </td>
            <td>
                <div className="button-container">
                    <button>Delete</button>
                    <button>Purchased</button>
                </div>
            </td>
        </tr>
    );
}

export default ShoppingRow;
