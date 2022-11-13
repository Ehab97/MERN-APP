import express from 'express';
import bodyParser from 'body-parser';
import placesRouter from './routes/places-routes';
import usersRouter from './routes/users-routes';
import HttpError from './models/http-error';
import mongoose from 'mongoose';

//define constants
const PORT:number        = process.env.PORT?+process.env.PORT: 5000;
const HOSTNAME:string    = process.env.HOSTNAME || 'localhost';
const DB_URL:string      = "mongodb://127.0.0.1:27017";
const DB_NAME:string     = "places";

//end of constants

const app = express();

app.use(bodyParser.json());

app.use('/api/places',placesRouter);  // =>     it runs only if the path starts with /api/places
app.use('/api/users', usersRouter);   // =>     it runs only if the path starts with /api/users

//handle undefined routes
app.use((req,res,next)=>{
    const error = new HttpError('Could not find this route',404);
   throw error;
})
//handle errors
app.use((error:Error,req:express.Request,res:express.Response,next:express.NextFunction)=>{
   
    if (res.headersSent) {
        return next(error)
      }
      res.status(500)
      res.json({ error })
})


//connect db and start server


mongoose
.connect(DB_URL+"/"+DB_NAME)
.then((res)=>{
    console.log("Connected to DB");
    app.listen(PORT,HOSTNAME,()=>{
        console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
    });
})
.catch((err)=>{
    console.log(err);
})
