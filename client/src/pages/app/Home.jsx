import React, { useState } from "react";
import ShoppingTable from "../components/ShoppingTable";
import items from "../../data/items";
import Scrolling from "../components/Scrolling";

export const Home = (props) => {
    return (
        <div className="workspace">
            <h2 className="headline">Don't forget your essentials and limit your unplanned purchases!</h2>
            <div className="shopping-table-container">
                <ShoppingTable items={items} />
            </div>
            <Scrolling />
        </div>
    )
}
