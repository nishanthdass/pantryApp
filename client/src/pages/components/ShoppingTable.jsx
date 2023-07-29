import React, { useState, useEffect } from 'react';
import ShoppingRow from './ShoppingRow';
import axios from 'axios';
import AddItemTable from './Additem';

function ShoppingTable() {

  const [data, setData] = useState([]);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}`,};

  const getItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/shopping-loaditems",
        { headers }
      );
      setData(response.data); 
    }
    catch(error) {
      console.log('Error finding item:', error);
    }
  }

  const addRows = (dataArray, minRows) => {
    const emptyRow = { item: '', quantity: '', unit: ''};
    const missingRows = Math.max(minRows - dataArray.length, 0);
    const emptyRows = Array.from({ length: missingRows }, () => emptyRow);
    return dataArray.concat(emptyRows);
  }

  useEffect(() => {
    getItems();
    
    return () => {
    };
  }, []);


   const handleAddItem = async (item, quantity, unit) => {
    try {
      // Create a new item object with the provided data
      const newItem = {
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
    try {
      // find all items in pantry and shopping list
      const findItems_response = await axios.get(
        "http://localhost:5000/shopping-suggest-req",{ headers}
          );
      const itemObjectsList = findItems_response.data
      const itemList = itemObjectsList.map(item => item.item);
      console.log(itemList)
        } catch (error) {
          console.log('Error finding item:', error);
        }   
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

      const handleMoveItem = async (itemId) =>  {
        try {
          // Create a new object with the itemId as the value for the key "itemId"
          const requestData = { itemId: itemId };
          const response = await axios.post(
            "http://localhost:5000/shopping-moveitem", requestData, {headers}
          );
          console.log("Item moved successfully:", itemId);
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
          {data.map((useritem) => (
            <ShoppingRow useritem={useritem} key={useritem._id} onDelItem={handleDelItem} onMoveItem={handleMoveItem} />
          ))}
          <AddItemTable onAddItem={handleAddItem} />
        </tbody>
      
    </>
  );
}

export default ShoppingTable;


