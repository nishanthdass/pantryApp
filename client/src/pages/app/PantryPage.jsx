import React, { useState } from "react"
import Import from "../components/Import"
import Day from "../components/Day"
import PantryTable from "../components/PantryTable"
import pantrys from "../../data/pantry"

export const PantryPage = (props) => {

    return (
        <>
        <div className="workspace">
        <Day/>
            <div className="shopping-table-container">
                <PantryTable pantrys={pantrys} />
            </div>
        </div>
        </>
    )
}


