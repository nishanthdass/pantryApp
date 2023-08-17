import React, { useState } from "react";
import ShoppingTable from "../components/ShoppingTable";
import Scrolling from "../components/Scrolling";
import BottomTab from "../components/BottomTab";
import axios from 'axios';
import { useRecipes } from '../components/RecipeContext';
import RecipePopup from '../components/RecipePopup';
import Popup from "../components/Popup";


export const Home = () => {
  // use context for recipies accross components
  const { recipes, setRecipes, recipesExist, setRecipesExist } = useRecipes();

  // sets state for the recipe tab
  const [menu, setMenu] = useState(true);
  const [showBottomTab, setShowBottomTab] = useState(false)

  // sets state for contents of recipe tab pop up
  const [loading, setLoading] = useState(false);
  const [showScrolling, setShowScrolling] = useState(false);

  // sets state for ingredients side panel
  const [showRecipe, setShowRecipe] = useState(false)
  const [curRecipeExp, setCurRecipeExp] = useState([])


  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}`,};

  const handleTabClick = () => {
      setMenu((prevState) => !prevState);
      if (!menu){
          setTimeout(() => {
              setShowScrolling(false)
            }, "500");
      }
      else {
          setShowScrolling(true)
      }
  };


  const handleFindRecipies = async () => {
      try {
        setLoading(true)  
        const findItems_response = await axios.get(
          "http://localhost:5000/shopping-suggest-req",{ headers}
            );
            const mappedItems = Object.entries(findItems_response.data).map(([recipeName, ingredients]) => {
              return { name: recipeName, ingredients: ingredients };
            });
            if (mappedItems.length >= 1){
              setShowBottomTab(true)
              setLoading(false) 
              setRecipes(mappedItems)
              setRecipesExist(true)
            }
            else{
              console.log("No Recipes")
            }
          } 
      catch (error) {
            setShowBottomTab(false)
            console.log('Error finding item:', error);
          }
        };

  const handleItemClick = async(isExpanded, recipe)=>{
    setShowRecipe(isExpanded)
    setCurRecipeExp(recipe)
  }

  return (
      <>
          <div className="shop-list-pantry">
              <h2 className="headline" style={{ fontFamily: 'Bungee, Monospace' }}>Plan your essentials, mind your spending!</h2>
              <div className={`${showRecipe ? 'horizontal-split':''}`}>
              { showRecipe &&
                <RecipePopup curRecipeExp={curRecipeExp}/>
              }
              <div className={menu? "tablecontainer":"tablecontainermin"}>
                <table className="itemstable">
                    <ShoppingTable onFindItems={handleFindRecipies}/>
                </table>
              </div>
              </div>
              <div className="popup">
              { showBottomTab && 
              <Popup />
              }
              </div>
              { showBottomTab && 
              <BottomTab onTabClick={handleTabClick} ifRecipesExist={recipesExist} />
              }
          </div>
          
          {showScrolling && 
          <div className="recipiewindow">
          <div className="recipeitem">
              <Scrolling recipes={recipes} loading={loading} onExpandToggle={handleItemClick}/>
          </div>
          </div>}
      </>
  );
};
