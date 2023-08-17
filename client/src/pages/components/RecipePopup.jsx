import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function RecipePopup({curRecipeExp}) {

    const [itemList, setItemList] = useState([])

    useEffect(()=> {
        const formatedString = curRecipeExp.ingredients.slice(2, curRecipeExp.ingredients.length-1)
        const listOfSplicedIngredients = formatedString.split(',')
        console.log(listOfSplicedIngredients)
        setItemList(listOfSplicedIngredients)
    },[curRecipeExp]
    )


  return (
  <>
    <div class="recipe-pop-up">
        <table>
            <tr>
                <th>Ingredients</th>
            </tr>
            {itemList.map((item)=><tr>{item}</tr>)}
        </table>
    </div>
  </>
  );
}

export default RecipePopup;