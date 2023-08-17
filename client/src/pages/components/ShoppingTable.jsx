import React, { useState, useEffect } from 'react';
import ShoppingRow from './ShoppingRow';
import axios from 'axios';
import AddItemTable from './Additem';
import { items } from '../../data/items';

function ShoppingTable({onFindItems}) {

  const [rows, setRows] = useState([])
  const [scrollData, setScrollData] =useState([])

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}`,};

  const getItems = async () => {
    try {
      onFindItems()
      const response = await axios.get(
        "http://localhost:5000/shopping-loaditems",
        { headers }
      );
      const recData = response.data
      const highestRow = recData.reduce((maxRowId, item) => Math.max(maxRowId, item.rowId), -Infinity);
      const dataSetup = addRows(Math.max(response.data.length, highestRow) +10, recData)
      setRows(dataSetup)
    }
    catch(error) {
      console.log('Error finding item:', error);
    }
  }

  const addRows = (rowNums, myData) => {
    const emptyRow = { rowId: '', item: '', quantity: '', unit: '' };
    const emptyRows = Array.from({ length: rowNums }, (_, index) => ({
      ...emptyRow,
      rowId: index,
    }));
    const totalTable = emptyRows.map((emptyItem)=> 
    {const matchingObj = myData.find((item)=>item.rowId === emptyItem.rowId)
    
    if (matchingObj){
      return { ...emptyItem, ...matchingObj };
    }
    else {
      return { ...emptyItem};
    }
    })
    return totalTable
  };


  useEffect(() => {
    getItems();
    
    return () => {
    };
  }, []);


   const handleAddItem = async (rowId, item, quantity, unit) => {
    try {
      // Create a new item object with the provided data
      const newItem = {
        rowId: rowId,
        item: item,
        quantity: quantity,
        unit: unit,
      };
      const addItem_response = await axios.post(
        "http://localhost:5000/shopping-additem", newItem,{ headers}
          );
          getItems();
        } catch (error) {
          // Handle errors if the server request fails
          console.log('Error adding item:', error);
        }
    // try {
    //   // find all items in pantry and shopping list
    //   const findItems_response = await axios.get(
    //     "http://localhost:5000/shopping-suggest-req",{ headers}
    //       );
    //   console.log(findItems_response)

    //     } catch (error) {
    //       console.log('Error finding item:', error);
    //     }
      };

      const handleDelItem = async (itemId) => {
        try {
          // Create a new object with the itemId as the value for the key "itemId"
          const requestData = { itemId: itemId };
      
          const response = await axios.delete(
            "http://localhost:5000/shopping-delitem",
            {
              data: requestData, // Send the itemId in the request body
              headers: headers // Assuming you have the headers defined elsewhere
            }
          );
          console.log("Item deleted successfully:", itemId);
          getItems(); // Refresh the items after deletion
        } catch (error) {
          // Handle errors if the server request fails
          console.error("Error deleting item:", error);
        }
      };

      const handleMoveItem = async (itemId, rowId) =>  {
        try {
          // Create a new object with the itemId as the value for the key "itemId"
          const requestData = { itemId: itemId };
          const response = await axios.post(
            "http://localhost:5000/shopping-moveitem", requestData, {headers}
          );
          console.log("Item moved successfully:", itemId, rowId);

          getItems(); // Refresh the items after deletion
        } catch (error) {
          // Handle errors if the server request fails
          console.error("Error moving item:", error);
        }
      };
      

      
  return (
    <>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {rows.map((row)=>
          <ShoppingRow
            useritem={row}
            key={row.rowId}
            onAddItem={handleAddItem}
            onDelItem={handleDelItem}
            onMoveItem={handleMoveItem}
          />
          )}
        </tbody>
    </>
  );
}

export default ShoppingTable;