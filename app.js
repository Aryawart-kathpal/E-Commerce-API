require('dotenv').config();
require('express-async-errors');// to avoid try-catch

// express
const express = require('express');
const app =express();

//all other packages
const morgan = require('morgan');

// database
const connectDB = require('./db/connect');

// routes
const authRouter = require('./routes/authRoutes');

// impoort middleware
const notFoundMiddleware= require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.json());
app.use(morgan('tiny'));

//routes
app.get('/',(req,res)=>{
    res.send("E-commerce-API");
})

app.use('/api/v1/auth',authRouter);

app.use(notFoundMiddleware);// in the notFoundMiddleware we are not calling next() so the call gets ended here only
app.use(errorHandlerMiddleware);// this is only thrown in the errors from the already existing routes, it can't be invoked from the routes that doesn't even exist

const port=process.env.PORT||5000;

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        console.log("Successfully connected to the databse...");
        app.listen(port,()=>console.log(`Server is listening at port ${port}...`));
    } catch (error) {
        console.log(error);
    }
}

start();