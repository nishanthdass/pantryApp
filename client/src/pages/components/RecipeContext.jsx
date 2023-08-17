import React, { createContext, useContext, useState } from 'react';

const RecipesContext = createContext();

export const RecipesProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [recipesExist, setRecipesExist] = useState(false);

  return (
    <RecipesContext.Provider value={{ recipes, setRecipes, recipesExist, setRecipesExist }}>
      {children}
    </RecipesContext.Provider>
  );
};

export const useRecipes = () => {
  return useContext(RecipesContext);
};