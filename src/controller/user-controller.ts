import express from 'express';
import crypto from 'crypto';
import { User, RequestParams } from '../models/user';
import { validationResult } from 'express-validator';
import HttpError from './../models/http-error';
import UserModel from '../models/user-schema';


let DUMMY_USERS: User[] = [
    {
        id: 'u1',
        name: 'Max Schwarz',
        email: 'max@gmail.com',
        password: 'testers'
    },
    {
        id: 'u2',
        name: 'Manu Lorenz',
        email: 'manu@gmail.com',
        password: 'testers'
    }
]

const getAllUsers = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const users = await UserModel.find({}, '-password');
        res.json({ users: users });
    } catch (err) {
        return next(new HttpError('Could not find users', 500));
    }
};

const getUserById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const params = req.params as RequestParams;
    const userId = params.userId;
    try {
        const user = await UserModel.findById(userId, '-password');
        res.json({ user: user });
    } catch (err) {
        return next(new HttpError('Could not find user', 500));
    }
};

const userSignup = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        throw new HttpError('Invalid inputs passed, please check your data.', 422);
    }
    const body = req.body as User;
    const { name, email, password, image } = body;
    console.log('body', body);
    const createdUser: User = {
        name,
        email,
        password,
        image: image || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
        places: []
    }
    console.log('createdUser', createdUser);
    //check if user already exists
    let isUserExists = await UserModel.findOne({ email: email });
    if (isUserExists) {
        return next(new HttpError('User already exists', 422));
    }
    console.log('isUserExists', isUserExists);
    try {
        const user = new UserModel(createdUser);
        await user.save();
        res.status(201).json({ msg: "Signed Up", user: createdUser });
    } catch (err) {
        console.log(err);
        return next(new HttpError('Could not save user', 500));
    }
};

const userLogin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        throw new HttpError('Invalid inputs passed, please check your data.', 422);
    }
    const body = req.body as User;
    const { email, password } = body;
    let isUserExists = await UserModel.findOne({ email: email });
    if (!isUserExists) {
        return next(new HttpError('User is not exists', 422));
    }
    try {
        const user = await UserModel.findOne({ email: email, password: password });
        res.json({ msg: 'Logged In ', user: user });
    } catch (err) {
        console.log(err);
        return next(new HttpError('Could not find user', 500));
    }
};

export { getAllUsers, getUserById, userSignup, userLogin };