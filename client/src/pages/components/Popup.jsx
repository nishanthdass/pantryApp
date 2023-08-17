import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePopup } from './PopupContext';


function Popup() {

  const {showSpeechBubble, setSpeechBubble} = usePopup();
  

  const handleBubbleClick = async () => {
    if (showSpeechBubble) {
      setSpeechBubble(false)
    }
  }


  return (
  <>
    {showSpeechBubble && 
      <div class="bubble">
        <div className='speech-text'>
          <p>
          New Features!
          <br />
          - Click the below tab to see suggested recipies that are taylored to your list & pantry
          <br />
          - Selecting a recipie will provide you with the nessesary ingredients to make the recipe
          <br />
          </p>
          <button onClick={handleBubbleClick}>
            Ok
          </button>
          </div>
      </div>
    }
  </>
  );
}

export default Popup;