const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const db = require('./db/db.js');
const userRouter = require('./routes/userRouter.js');
const topicRouter = require('./routes/topicRouter.js');
const cors = require('cors')
const Topic = require('./models/topics.js')
const app = express();

const PORT = process.env.PORT || 3000;

db();
app.use(express.json())
app.use(cookieParser());

// Enable CORS here
app.use(cors());

app.get('/', (req, res) => {
    res.json({msg: "this is get requestr"})
})


app.use('/api', topicRouter);
app.use('/user', userRouter);

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
    
});


