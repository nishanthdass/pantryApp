import React, { useState } from 'react';

function PantryRow({ pantry }) {
    const [myitem, setItem] = useState(pantry.name);
    const [quantity, setQuantity] = useState(pantry.quantity);
    const [unit, setUnit] = useState(pantry.unit);

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
                <button>Delete</button>
            </td>
        </tr>
    );
}

export default PantryRow;
