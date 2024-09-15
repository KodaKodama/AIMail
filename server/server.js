const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const db = require('./db/db.js');
const userRouter = require('./routes/userRouter.js');
const app = express();

const PORT = process.env.PORT || 3000;

db();
app.use(express.json())
app.use(cookieParser());

app.get('/', (req, res) => {
    res.json({msg: "this is get requestr"})
})

// Routes
app.use('/user', userRouter);

app.listen(PORT, () => {
    console.log('serverr is running');
    
});


