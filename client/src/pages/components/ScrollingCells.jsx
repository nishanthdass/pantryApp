import React, { useState } from 'react';

function ScrollingCells({recipe}) {
    const [myRecipe, setRecipe] = useState(recipe.name)
    
    return (
        <>
            <div className='scrollitem'>{myRecipe}</div>
        </>
    );
}

export default ScrollingCells;
