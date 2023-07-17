import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Scrolling() {
    const [visible, setVisible] = useState(true);
    const [demo, setDemo] = useState(true)

    const removeElement = (isTrue) => {

        setVisible((prev) => !prev);
        if (isTrue){
            setDemo((prev) => !prev);
        }
    };

    const removeDemoElement = () => {
        setDemo((prev) => !prev);
    }

    return (
        <>
            {visible && (
                <div class="speech top">
                    <div className="text-container">
                    <text>New Features: Selecting a suggested recipe will auto-fill your Cart with respective ingredients. Turn on feature? </text>
                    </div>
                    <div>
                        
                        <div className="button-container">
                            <button onClick={() => removeElement(true)} type="button" value={true}>
                                Yes
                            </button>
                            <button onClick={() => removeElement(false)} type="button" value={false}>
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {!demo && (
                <div class="speech top">
                    <div className="text-container" onClick={removeDemoElement}>
                    <p>Demo....</p>
                    </div>
                </div>
            )}
            
            
            <div class="scrollmenu">
                <a href="#pizza">Pizza</a>
                <a href="#Pasta">Pasta</a>
                <a href="#Lasagna">Lasagna</a>
                <a href="#Spaghetti">Spaghetti</a>
                <a href="#Linguini">Linguini</a>
                <a href="#news">Tomato Chutney</a>
                <a href="#contact">Chicken Curry</a>
                <a href="#about">Meatballs w/ Marinara</a>
                <a href="#home">Chicken Tikka</a>
                <a href="#news">Chicken Tandoori</a>
                <a href="#contact">Eggplant Alfredo</a>
                <a href="#about">Breadsticks w/ sauce</a>
            </div>
        </>
    );
}

export default Scrolling;
