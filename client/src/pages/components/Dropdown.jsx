import React, { useState } from 'react';
import ClickOutside from '../tools/ClickOutside'

function Dropdown({item, setSelectedValue, setDropValue}) {

  const handleItemClick = (item) => {
    if (item){
      setSelectedValue(item)
      setDropValue(false)
    }
  }

  const ref = ClickOutside(handleItemClick);

  

  return (
    <>
      <div className='dropdown-window' ref={ref}>
      {item.map((ingredient, i)=>(
        <div className='dropdown-cell' 
        key={i} 
        onClick={() => handleItemClick(ingredient.name)} 
        ><span>{ingredient.name}</span></div>
      ))}
      </div>
    </>
  );
}

export default Dropdown;
