import mongoose from 'mongoose';
import 'dotenv/config';

// MongoDB connection string from environment variable
const MONGODB_CONNECT_STRING = process.env.MONGODB_CONNECT_STRING;

// Connect to the database
mongoose.connect(MONGODB_CONNECT_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'accounts', // Specify the database name here
});

// Access the mongoose connection instance
const db = mongoose.connection;

// The open event is called when the database connection successfully opens
db.once('open', () => {
  console.log('Successfully connected to the database');
});

// Export the mongoose instance
export default mongoose;
