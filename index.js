const express = require('express');
require('dotenv').config();
const { connection } = require('./configs/db');
const { userRouter } = require('./routes/UserRouter');
const { authRouter } = require('./routes/authRouter');
const { accessRouter } = require('./routes/accessRouter');

const app = express();
const port = process.env.port;

app.use(express.json());

app.get("/", (req, res) => {
    return res.send("Hello")
})

app.use('/', userRouter);
app.use('/', authRouter);
app.use('/', accessRouter);

app.listen('4500', async () => {
    try {
        await connection;
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error while connecting to mongodb', error);
        process.exit(1);
    }
    console.log(`server is live at port ${port}`);
})