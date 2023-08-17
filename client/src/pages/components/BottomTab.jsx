import React, { useState } from 'react';


function BottomTab({onTabClick, ifRecipesExist}) {
    const tabClick = async () => {
        onTabClick()
      }; 

  return (
  <>
  {ifRecipesExist ?
    <div class="bottom-tab" onClick={tabClick}>
        <span>Recipes</span>
    </div>
    :
    <div class="bottom-tab-null">
        <span>Recipies</span>
    </div>
    }
  </>
  );
}

export default BottomTab;