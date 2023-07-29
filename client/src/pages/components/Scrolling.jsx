import React, { useState } from 'react';
import Textbubble from './Textbubble';
import ScrollingCells from './ScrollingCells';

function Scrolling({recipes}) {


    return (
        <>
           <div className='recipewindow'>
                <div class="scrollmenu">
                {recipes.map((recipe, i)=>(
                    <ScrollingCells recipe={recipe} key={i} />
                ))}
                </div>
            </div>

            
        </>
    );
}

export default Scrolling;
