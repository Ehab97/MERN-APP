import express from 'express';
import mongoose from 'mongoose';
import crypto from 'crypto';
import { validationResult } from 'express-validator';
import HttpError from '../models/http-error';
import { RequestParams, Place } from '../models/place';
import getCoordsForAddress from '../utils/location';
import PlaceModel from '../models/place-schema';
import UserModel from '../models/user-schema';
import fs from 'fs';

const getAllPlaces = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    PlaceModel.find({}, (err: Error, places: [Place]) => {
        if (err) {
            console.log('err', err);
            return next(new HttpError('Could not find places', 500));
        }
        res.json({ status: 'success', data: { places: places } });
    })
};

const getPlaceById = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const params = req.params as RequestParams;
    const placeId = params.placeId;
    PlaceModel.findById(placeId, (err: Error, place: Place) => {
        if (err) {
            return next(new HttpError('Could not find place', 500));
        }
        res.json({ status: 'success', data: { place: place } });
    })
};

const getPlacesByUserId = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const params = req.params as RequestParams;
    const userId = params.userId;
    PlaceModel.find({ creator: userId }, (err: Error, places: [Place]) => {
        if (err) {
            return next(new HttpError('Could not find places', 500));
        }
        res.json({ status: 'success', data: { places: places } });
    })
}
const createNewPlace = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req);
    let error;
    console.log('errors', errors);
    if (!errors.isEmpty()) {
        error = new HttpError('Invalid inputs passed, please check your data.', 422);
        return next(error);
    }
    const body = req.body as Place;
    console.log('body', body);
    const { title, description, location, address, creator, image } = body;
    const id = crypto.randomBytes(16).toString("hex");
    console.log(body)
    let coordinates;
    try {
        //in case we want to use google api
        // coordinates = await getCoordsForAddress(address);
        coordinates = { lat: 40.7484474, lng: -73.9871516 };
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
        image: req?.file?.path,
    };
    console.log(createdPlace);
    let user;
    try {
        user = await UserModel.findById(creator);
    } catch (err) {
        let error = new HttpError('error in create place', 500);
        return next(error);
    }
    console.log(user);
    if (!user) {
        let error = new HttpError('Could not find user', 500);
        return next(error);
    }
    const place = new PlaceModel(createdPlace);
    //1 create  place and check if it is created or not
    try {
        await place.save();
    } catch (err) {
        let error = new HttpError('error in create place', 500);
        console.log('err', err);
        return next(error);
    }
    //2 add place to user
    user?.places?.push(place);
    //3 save user
    await user.save()
    res.status(201).json({
        status: 'success',
        data: {
            place: createdPlace
        }
    });
}

const updatePlaceById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
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
    let place;
    try {
        place = await PlaceModel.findById(placeId)
    } catch (err) {
        let error = new HttpError('Could not find place', 500);
        return next(error);
    }
    console.log('userData', req.body.userData)
    if (place?.creator?.toString() != req.body.userData.userId) {
        let error = new HttpError('You are not Allowed to edit this place', 401);
        return next(error);
    }

    try {
        const result = await PlaceModel.updateOne({ _id: placeId }, { title, description })
        res.status(200).json({
            status: 'success', data: {
                result
            }
        });
    } catch (err) {
        let error = new HttpError('Could not update place', 500);
        return next(error);
    }

}

const deletePlaceById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const params = req.params as RequestParams;
    const placeId = params.placeId;
    let place;
    console.log(placeId);
    place = await PlaceModel.findById(placeId)
    if (!place) {
        let error = new HttpError('Could not find place', 500);
        return next(error);
    }

    if (place?.creator?.toString() != req.body.userData.userId) {
        let error = new HttpError('You are not Allowed to delete this place', 401);
        return next(error);
    }

    const imagePath: any = place.image;
    // let place;
    try {
        // place = await PlaceModel.findById(placeId).populate('creator');
        await PlaceModel.deleteOne({ _id: placeId });
    } catch (err) {
        let error = new HttpError('Could not delete place', 500);
        return next(error);
    }
    // await UserModel.updateMany({}, { $pull: { 'users.places': placeId } })
    await UserModel.updateMany({}, { $pull: { places: placeId } });
    fs.unlink(imagePath, (err: any) => {
        console.log(err);
    });
    res.status(200).json({ status: 'success', message: 'Deleted place' });
}

export { getPlaceById, getPlacesByUserId, createNewPlace, deletePlaceById, updatePlaceById, getAllPlaces };