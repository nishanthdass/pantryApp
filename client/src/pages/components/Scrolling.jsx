import React, { useState, useEffect } from 'react';
import ScrollingCells from './ScrollingCells';

function Scrolling({ recipes, loading, onExpandToggle }) {
    const [isLoading, setIsLoading] = useState(false)
    const [curRecipe, setCurRecipe] = useState([]);

    useEffect(() => {
        setIsLoading(loading)
        setCurRecipe(recipes);
    }, [recipes, isLoading]);


    return (
        <>
        {!loading && <div className='scrollmenu'>
            {curRecipe.map((recipe, i) => (
                <ScrollingCells recipe={recipe} key={i} delay={i * 100} onExpandToggle={onExpandToggle} />
            ))}
        </div>}
        {loading && <div className='scrollmenu'>
            Loading
        </div>}
        </>
    );
}

export default Scrolling;
