import React, { useState } from 'react';

function Day() {
  const handlePreviousDay = () => {
  };

  const handleNextDay = () => {
  };

  return (
    <>
    <div className='dateday'>
      <button onClick={handlePreviousDay}>&lt;----</button>
      Monday, 7-17-2023
      <button onClick={handleNextDay}>----&gt;</button>
      </div>
    </>
  );
}

export default Day;
