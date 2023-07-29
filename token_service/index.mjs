import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const PORT = process.env.PORT || 8000; 
const app = express();

app.use(express.json());
app.use(cors());


app.post('/tokenapi', express.json(), asyncHandler(async (req, res) => {
    try {
        console.log("Request made to Token API: ", req.body)
        const secret = process.env.JWT_SECRET; 
        const myObjKey = Object.keys(req.body)[0]; 
        const myTimeKey = Object.keys(req.body)[1]
        const id = req.body[myObjKey]; 
        const  expiresIn = req.body[myTimeKey]; 
        const token = await jwt.sign({ id }, secret, { expiresIn });
        console.log("Response sent from Token API: ", token)
        res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }));


  app.post('/tokenapi/verify', express.json(), asyncHandler(async (req, res) => {
    try {
        console.log("Request made to Token API: ", req.body)
        const myKey = Object.keys(req.body)[0];
        const token = req.body[myKey]; 
        const decodedtoken = await jwt.verify(token, process.env.JWT_SECRET);
        const objectId = decodedtoken.id
        console.log("Response sent from Token API: ", objectId)
        res.status(200).json({ objectId });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }));




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});