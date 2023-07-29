import 'dotenv/config';
import * as users from './models/user_model.mjs';
import * as shoppinglist from './models/shoppinglist_model.mjs'
import * as pantry from './models/pantry_model.mjs';
import express from 'express';
import asyncHandler from 'express-async-handler';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { spawn } from 'child_process';
import {extractIngredients, extractItemCsv} from './data/recipe_dataset/parse_recipies.mjs'
import axios from 'axios';
import upload from './tools/multer.mjs';

const PORT = process.env.PORT || 5000; // Use port 5000 as a fallback if PORT is not defined in the environment variables

const app = express();

app.use(express.json());
app.use(cors());


async function callJwt(objectId, time) {
  try {
    console.log("Post request made from Client Server: ", objectId, time)
    const response = await axios.post('http://localhost:8000/tokenapi', { objectId: objectId, time: time }, {
      headers: {
        'Content-Type': 'application/json', 
      },
    });
    console.log("Response received from Token API by Client Server: ", response.data)
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

async function callJwtVerfiy(token_Id) {
  try {
    console.log("Post request made from Client Server: ", token_Id)
    const response = await axios.post('http://localhost:8000/tokenapi/verify', { token_Id }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log("Response received from Token API by Client Server: ", response.data.objectId)
    return response.data.objectId;
  } catch (error) {
    throw new Error(error);
  }
}


app.post('/login', asyncHandler(async (req, res) => {
  try {
    
    const emailFilter = { email: req.body.emailuser };
    const emailProjection = { email: 1 };
    const emailLimit = 1;
    const userFilter = { username: req.body.emailuser };
    const userProjection = { user: 1 };
    const userLimit = 1;
    const PasswordInput = req.body.password
    const Email = await users.findUsers(emailFilter, emailProjection, emailLimit);
    const User = await users.findUsers(userFilter, userProjection, userLimit);
    const expiresIn = '12h'
    

    let ID;
    if (Object.keys(User).length === 1) {
      ID = User[0]._id; 
      const UserObj = await users.findUserById(ID)
      if (UserObj.password === PasswordInput) {
        const token = await callJwt(ID, expiresIn)
        res.status(200).json({ message: 'Login successful', token })
      };
    } else if (Object.keys(Email).length === 1) {
      ID = Email[0]._id; 
      const UserObj = await users.findUserById(ID)
      if (UserObj.password === PasswordInput) {
        const tokenCall = await callJwt(ID, expiresIn)
        const token = await tokenCall.token
        res.status(200).json({ message: 'Login successful', token })
      };
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}));



app.post('/register', asyncHandler(async (req, res) => {
  try {
    const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
    const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; 
    const emailFilter = {email : req.body.email}
    const emailProjection = { email: 1 }
    const emailLimit = 1
    const userFilter = {username : req.body.username}
    const userProjection = { username: 1 }
    const userLimit = 1
    const userEmail = await users.findUsers(emailFilter, emailProjection, emailLimit);
    const userUsername = await users.findUsers(userFilter, userProjection, userLimit);
    const isValidEmail = emailRegex.test(emailFilter.email);
    const isValidPassword = passwordRegExp.test(req.body.password)
    if (!isValidEmail){
      res.status(400).json({ Error: 'Email is invalid' });
      console.log("email is invalid")
    }
    else if (!isValidPassword){
      res.status(400).json({
        Error: 'Password does not meet requirements',
        Message: 'Your password must meet the following criteria:\n\n' +
          '- At least 8 characters long.\n' +
          '- Must contain at least one digit (0-9).\n' +
          '- Must contain at least one lowercase letter (a-z).\n' +
          '- Must contain at least one uppercase letter (A-Z).\n' +
          'Please ensure that your password meets these requirements and try again.'
      });
      console.log("Password does not meet requirements")
    }    
    else if (Object.keys(userFilter.username).length < 3 || Object.keys(userFilter.username).length >= 50){
      res.status(400).json({ Error: 'Username should be between 3 and 50 characters' });
      console.log('Username should be between 3 and 50 characters')
    }
    else if (Object.keys(userEmail).length > 0 || Object.keys(userUsername).length >0 ){
      res.status(409).json({ Error: 'user and/or email already exists' });
      console.log('user and/or email already exists')
    }
    else {
      const user = await users.createUser(req.body.email, req.body.username, req.body.password);
      res.status(201).json(user);
    }
    
  } catch (error) {
    res.status(400).json({ Error: 'Invalid request' });
  }
}));

app.post('/shopping-additem', asyncHandler(async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const object_Id = await callJwtVerfiy(token)
    const filter = { user: object_Id };

    const newItem = await shoppinglist.createItem(req.body.item, req.body.quantity, req.body.unit, object_Id);
    res.status(201).json({ newItem });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}));



app.get('/shopping-suggest-req', asyncHandler(async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const object_Id = await callJwtVerfiy(token)
    const filter = { user: object_Id };
    const findListItems = await shoppinglist.findItems(filter);
    const findPantryItems = await pantry.findItems(filter);
    const allItems = [...findListItems, ...findPantryItems]
    res.status(201).json(allItems);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}));


app.get('/shopping-loaditems', asyncHandler(async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const object_Id = await callJwtVerfiy(token)
    const filter = { user: object_Id };
    const foundItem = await shoppinglist.findItems(filter);
    res.status(201).json(foundItem);
    
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}));

app.delete('/shopping-delitem', asyncHandler(async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const object_Id = await callJwtVerfiy(token)
    const object_to_delete = {
        _id: req.body.itemId,
        user: object_Id,
      };
    const deleteItemCall = await shoppinglist.deleteItem(object_to_delete);
    res.status(201).json(deleteItemCall);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}));

app.post('/shopping-moveitem', asyncHandler(async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const object_Id = await callJwtVerfiy(token)
    const object_to_move = {
        _id: req.body.itemId,
        user: object_Id,
      };
    const sourceItem = await shoppinglist.findItems(object_to_move);
    const newPantryItem = await pantry.createItem(sourceItem[0].item, sourceItem[0].quantity, sourceItem[0].unit, sourceItem[0].user)
    const deleteItemCall = await shoppinglist.deleteItem(object_to_move);
    res.status(201).json(newPantryItem);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}));


app.get('/pantry-loaditems', asyncHandler(async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const object_Id = await callJwtVerfiy(token)
    const filter = { user: object_Id };
    const foundItem = await pantry.findItems(filter);
    res.status(201).json(foundItem);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}));


app.delete('/pantry-delitem', asyncHandler(async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const object_Id = await callJwtVerfiy(token)
    const object_to_delete = {
        _id: req.body.itemId,
        user: object_Id,
      };
    const deleteItemCall = await pantry.deleteItem(object_to_delete);
    res.status(201).json(deleteItemCall);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}));



app.post('/import', upload.single('file'), asyncHandler(async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const object_Id = await callJwtVerfiy(token)
    const filename = req.file.filename
    const parseCsv = await extractItemCsv(filename)

    
    const data = parseCsv.map(([item, quantity, unit]) => {
      return {
        item: item,
        quantity: quantity,
        unit: unit,
        user: object_Id
      };
    });

    const loadData = await pantry.importItems(data);

    res.status(200).json({ message: 'File uploaded successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}));


app.post('/shopping-additem-getIngredients', async (req, res) => {
  try {
    const myItem = req.body.item
    const getIngredients = await extractIngredients(myItem);
    res.status(201).json(getIngredients);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});