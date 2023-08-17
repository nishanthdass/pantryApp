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
        const secret = process.env.JWT_SECRET; 
        const myObjKey = Object.keys(req.body)[0]; 
        const myTimeKey = Object.keys(req.body)[1]
        const id = req.body[myObjKey]; 
        const  expiresIn = req.body[myTimeKey]; 
        const token = await jwt.sign({ id }, secret, { expiresIn });
        res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }));


  app.post('/tokenapi/verify', express.json(), asyncHandler(async (req, res) => {
    try {
        const myKey = Object.keys(req.body)[0];
        const token = req.body[myKey]; 
        const decodedtoken = await jwt.verify(token, process.env.JWT_SECRET);
        const id = decodedtoken.id
        res.status(200).json({ id });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }));




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});