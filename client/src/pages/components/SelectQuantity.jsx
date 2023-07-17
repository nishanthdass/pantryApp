import React, { useState } from 'react';
import { MdAdd, MdOutlineClear} from 'react-icons/md';

function SelectQuantity() {
    const [counter, setCount] = useState(0)
    const incrementor = () => { if (counter < 10) setCount(counter + 1)} 
    const decrementor = () => { if (counter > 0) setCount(counter - 1)}
    return (
        <div className='counterbar'>
            <MdOutlineClear className='counterbtnleft' onClick={decrementor} />
            <span className='counters'>{counter}</span>
            <MdAdd className='counterbtnright' onClick={incrementor} />
        </div>
        
    );
}

export default SelectQuantity;