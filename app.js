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
const cookieParser = require('cookie-parser');
const notFoundMiddleware= require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(cookieParser(process.env.JWT_SECRET));// using the cookieParser middleware we can now access the req.cookies, which contains the token in it, so that we now not have to take the token from frontend everytime
app.use(express.json());
app.use(morgan('tiny'));

//routes
app.get('/',(req,res)=>{
    res.send("E-commerce-API");
})

app.get('/api/v1',(req,res)=>{
    // console.log(req.cookies);
    // after signed it we can now access the object only req.signedCookies
    console.log(req.signedCookies);
    res.send('e-commerce-api');
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