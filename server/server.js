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
    origin: (origin, callback) => {
        // Allow your frontend in production or localhost in development
        const allowedOrigins = [
            'https://ai-mail-fawn.vercel.app',
            'http://localhost:5173'
        ];
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
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

app.get('/api/scheduled-job', async (req, res) => {
    try {
    //   const users = await userController.getUsers();
    //   console.log('Users fetched:', users);
      res.status(200).send('Scheduled job executed');
    } catch (error) {
      console.error('Error executing scheduled job:', error);
      res.status(500).send('Failed to execute job');
    }
  })

app.listen(PORT, () => {
    console.log('serverr is running');
    // scheduler.start();    
});


