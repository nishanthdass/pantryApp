import React, { useState, useEffect } from 'react';
import PantryRow from './PantryRow';
import { useNavigate } from 'react-router-dom';
import { SelectDrop } from './Select';
import axios from 'axios';


function PantryTable( ) {
  const [data, setData] = useState([]);

  const token = localStorage.getItem("token");
  // Include the token in the request headers
  const headers = { Authorization: `Bearer ${token}`,};

  const getItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/pantry-loaditems",
        { headers }
      );
      console.log(response.data)
      setData(response.data); 
    }
    catch(error) {
      // Handle errors if the server request fails
      console.log('Error finding item:', error);
    }
  }

  const handleDelItem = async (itemId) => {
    try {
      // Create a new object with the itemId as the value for the key "itemId"
      const requestData = { itemId: itemId };
  
      const response = await axios.delete(
        "http://localhost:5000/pantry-delitem",
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

  useEffect(() => {
    getItems();

    return () => {
      // Clean-up code goes here (optional)
      // This function will be executed when the component is unmounted.
    };
  }, []);

  return (
    <div>
      <table className="itemstable">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((pantry) => (
            <PantryRow pantry={pantry} key={pantry._id} onDelItem={handleDelItem}/>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PantryTable;


