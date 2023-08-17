import React, { createContext, useContext, useState } from 'react';

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
    const [showSpeechBubble, setSpeechBubble] = useState(true)

  return (
    <PopupContext.Provider value={{ showSpeechBubble, setSpeechBubble}}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  return useContext(PopupContext);
};