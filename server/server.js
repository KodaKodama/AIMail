const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const db = require('./db/db.js');
const bodyParser = require('body-parser')
const userRouter = require('./routes/userRouter.js');
const topicRouter = require('./routes/topicRouter.js');
const scheduler = require("./services/scheduler.js");
const cors = require('cors')
const app = express();

const PORT = process.env.PORT || 3000;

db();
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? 'https://ai-mail-fawn.vercel.app' // Explicitly allow your frontend origin
        : 'http://localhost:5173',
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

// Preflight requests handling
app.options('*', cors()); // Allow preflight requests for all routes
  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.json({msg: "this is get requestr"})
})


app.use('/api', topicRouter);
app.use('/api/user', userRouter);

// const insertTopics = async () => {
//     try {
//       await Topic.insertMany(topics);
//       console.log('Topics inserted successfully');
//     } catch (error) {
//       console.error('Error inserting topics:', error);
//     }
//   };
  
//   // Insert the topics
//   insertTopics();

app.listen(PORT, () => {
    console.log('serverr is running');
    scheduler.start();    
});


