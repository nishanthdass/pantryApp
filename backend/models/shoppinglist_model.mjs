import mongoose from './db_connect.mjs'; // Import the mongoose instance from db_connect.mjs
import jwt from 'jsonwebtoken';

// Define the shopping list schema
const shoppingListSchema = mongoose.Schema({
  item: { type: String, required: true },
  quantity: { type: String, required: true },
  unit: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Create the Shopping model
const Shoppinglists = mongoose.model('Shoppinglists', shoppingListSchema);


// Function to create a new item in the shopping list
const createItem = async (item, quantity, unit, user) => {
  try {
    const newItem = new Shoppinglists({ item, quantity, unit , user});
    return await newItem.save();
  } catch (error) {
    console.error('Error creating item:', error.message);
    throw new Error('Failed to create item');
  }
};

const deleteItem = async (delete_object) => {
  try {
    // Assuming you have the MongoDB collection object named "Shoppinglists"
    const result = await Shoppinglists.deleteOne(delete_object);

    // Check the result to see if the document was deleted successfully
    if (result.deletedCount === 1) {
      return "Item deleted successfully";
    } else {
      throw new Error("Item not found or not deleted");
    }
  } catch (error) {
    console.error('Error deleting item:', error.message);
    throw new Error('Failed to delete item');
  }
};


const findItems = async (filter) => {
  const query = Shoppinglists.find(filter);
  return query.exec();
};



export { createItem, findItems, deleteItem }