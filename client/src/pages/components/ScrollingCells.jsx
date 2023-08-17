import React, { useState, useEffect } from 'react';

function ScrollingCells({ recipe, delay, onExpandToggle }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false)

    

    useEffect(() => {
        // Delay toggling visibility to create the animation effect

        setIsVisible(false);
        const timeout = setTimeout(() => {
            setIsVisible(true);
        }, delay);

        return () => {
            clearTimeout(timeout);
        };
    }, [delay]);

    const handleItemClick = async () => {
        setIsExpanded(prev => !prev);
        onExpandToggle(!isExpanded, recipe);
    }

    return (
        <>
        <div className={`scrollitem ${isVisible ? 'visible' : ''}`}>
            <div className='scrollitem-content' onClick={handleItemClick}>
                    <div className='scrollitem-content-text'>
                        {recipe.name}
                    </div>
            </div>
        </div>
        </>
        
    );
}

export default ScrollingCells;
