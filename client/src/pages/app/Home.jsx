import React, { useState } from "react";
import ShoppingTable from "../components/ShoppingTable";
import Scrolling from "../components/Scrolling";
import { recipes } from '../../data/items';
import axios from 'axios';



export const Home = (props) => {
          

    return (
        <>
        <div className="shop-list-pantry" >
            <h2 className="headline" style={{ fontFamily: 'Bungee, Monospace' }}>Plan your essentials, mind your spending!</h2>
            <table className="itemstable">
                <ShoppingTable />
            </table>
        </div>
        <Scrolling recipes={recipes} />
        </>
    )
}
