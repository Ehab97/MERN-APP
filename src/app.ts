import express from 'express';
import bodyParser from 'body-parser';
import placesRouter from './routes/places-routes';
import usersRouter from './routes/users-routes';
import HttpError from './models/http-error';
import mongoose from 'mongoose';
import morgan from 'morgan'
import { deleteImage } from './utils/delete-image';
import path from 'path';
//define constants
const PORT: number = process.env.PORT ? +process.env.PORT : 5000;
const HOSTNAME: string = process.env.HOSTNAME || 'localhost';
const DB_URL: string = "mongodb://127.0.0.1:27017";
const DB_NAME: string = "places";

//end of constants

const app = express();

app.use(bodyParser.json());
app.use('/uploads/images',express.static(path.join('uploads','images')));
app.use(morgan('dev'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
})

app.use('/api/places', placesRouter);  // =>     it runs only if the path starts with /api/places
app.use('/api/users', usersRouter);   // =>     it runs only if the path starts with /api/users

//handle undefined routes
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route', 404);
    throw error;
})
//handle errors
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    deleteImage(req);
    if (res.headersSent) {
        return next(error)
    }
    res.status(error?.errorCode || 500)
    res.json({ message: error.message || 'An unknown error occurred!' })
})


//connect db and start server


mongoose
    .connect(DB_URL + "/" + DB_NAME)
    .then((res) => {
        console.log("Connected to DB");
        app.listen(PORT, HOSTNAME, () => {
            console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    })
