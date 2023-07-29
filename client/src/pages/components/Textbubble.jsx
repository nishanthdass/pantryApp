import React, { useState } from 'react';

function Textbubble({}) {
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
                    <text>New Features: Selecting a suggested recipe will auto-fill your Cart with respective ingredients.</text>
                    </div>
                    <div>
                        
                        <div className="button-container">
                            
                            <button onClick={() => removeElement(true)} type="button" value={true}>
                                Learn more!
                            </button>
                            <button onClick={() => removeElement(false)} type="button" value={false}>
                                Continue
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

        </>
    );
}

export default Textbubble;
