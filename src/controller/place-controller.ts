import express from 'express';
import mongoose from 'mongoose';
import crypto from 'crypto';
import { validationResult } from 'express-validator';
import HttpError from '../models/http-error';
import { RequestParams, Place } from '../models/place';
import getCoordsForAddress from '../utils/location';
import PlaceModel from '../models/place-schema';
import UserModel from '../models/user-schema';

const getAllPlaces = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    PlaceModel.find({}, (err: Error, places: [Place]) => {
        if (err) {
            console.log('err', err);
            return next(new HttpError('Could not find places', 500));
        }
        res.json({ places: places });
    })
};

const getPlaceById = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const params = req.params as RequestParams;
    const placeId = params.placeId;
    PlaceModel.findById(placeId, (err: Error, place: Place) => {
        if (err) {
            return next(new HttpError('Could not find place', 500));
        }
        res.json({ place: place });
    })
};

const getPlacesByUserId = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const params = req.params as RequestParams;
    const userId = params.userId;
    PlaceModel.find({ creator: userId }, (err: Error, places: [Place]) => {
        if (err) {
            return next(new HttpError('Could not find places', 500));
        }
        res.json({ places: places });
    })
}
const createNewPlace = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req);
    let error;
    if (!errors.isEmpty()) {
        error = new HttpError('Invalid inputs passed, please check your data.', 422);
        return next(error);
    }
    const body = req.body as Place;
    const { title, description, location, address, creator, imageUrl } = body;
    const id = crypto.randomBytes(16).toString("hex");
    console.log(body)
    let coordinates;
    try {
        coordinates = await getCoordsForAddress(address);
    } catch (error) {
        console.log(error)
        return next(error);
    }
    const createdPlace: Place = {
        title,
        description,
        location: coordinates,
        address,
        creator,
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1542731244-7c7b2f7f5f4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
    };
    console.log(createdPlace);
    let user;
    try {
        user = await UserModel.findById(creator);
    }catch(err){
        let error = new HttpError('error in create place', 500);
        return next(error);
    }
    console.log(user);
    if(!user){
        let error = new HttpError('Could not find user', 500);
        return next(error);
    }
    const place = new PlaceModel(createdPlace);
    //1 create  place and check if it is created or not
    try {
        await place.save();
    }catch(err){
        let error = new HttpError('error in create place', 500);
        return next(error);
    }
    //2 add place to user
    user?.places?.push(place);
    //3 save user
    await user.save()
    res.status(201).json({ place: createdPlace });
}

const updatePlaceById = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        throw new HttpError('Invalid inputs passed, please check your data.', 422);
    }
    const params = req.params as RequestParams;
    const placeId = params.placeId;
    const body = req.body as Place;
    const { title, description } = body;
    console.log(body);
    PlaceModel
        .updateOne({ _id: placeId }, { title, description })
        .then((result) => {
            res.status(200).json({ message: 'Updated place', result });
        })
        .catch((err) => {
            let error = new HttpError('Could not update place', 500);
            return next(error);
        })
}

const deletePlaceById = async(req: express.Request, res: express.Response, next: express.NextFunction) => {
    const params = req.params as RequestParams;
    const placeId = params.placeId;
    console.log(placeId);
    // let place;
    try {
        // place = await PlaceModel.findById(placeId).populate('creator');
        await PlaceModel.deleteOne({ _id: placeId });
    }catch(err){
        let error = new HttpError('Could not delete place', 500);
        return next(error);
    }    
    // await UserModel.updateMany({}, { $pull: { 'users.places': placeId } })
    await UserModel.updateMany({}, { $pull: { places: placeId } });
    res.status(200).json({ message: 'Deleted place' });
}

export { getPlaceById, getPlacesByUserId, createNewPlace, deletePlaceById, updatePlaceById, getAllPlaces };