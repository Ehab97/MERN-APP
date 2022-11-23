import express from 'express';
import { User, RequestParams } from '../models/user';
import { validationResult } from 'express-validator';
import HttpError from './../models/http-error';
import UserModel from '../models/user-schema';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const getAllUsers = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const users = await UserModel.find({}, '-password');
        console.log('users', users);
        res.status(200).json({ status: 'success', data: { users: users } });
    } catch (err) {
        console.log('err', err);
        return next(new HttpError('Could not find users', 500));
    }
};

const getUserById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const params = req.params as RequestParams;
    const userId = params.userId;
    try {
        const user = await UserModel.findById(userId, '-password');
        res.status(200).json({ status: 'success', data: { user: user } });
    } catch (err) {
        return next(new HttpError('Could not find user', 500));
    }
};

const userSignup = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        // throw new HttpError('Invalid inputs passed, please check your data.', 422);
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }
    const body = req.body as User;
    const { name, email, password } = body;
    console.log('body', body);
    const createdUser: User = {
        name,
        email,
        password,
        image: req?.file?.path,
        places: []
    }
    console.log('createdUser', createdUser);
    //check if user already exists
    let isUserExists = await UserModel.findOne({ email: email });
    if (isUserExists) {
        return next(new HttpError('User already exists', 422));
    }
    console.log('isUserExists', isUserExists);
    let hashPassword;
    try {
        hashPassword = await bcrypt.hash(password, 12);
    } catch (e) {
        let error = new HttpError(
            'Could not create user, please try again.',
            500
        );
        return next(error);
    }
    createdUser['password'] = hashPassword;
    let user;
    try {
        user = new UserModel(createdUser);
        await user.save();
        // deleteImage(req);
    } catch (err) {
        console.log(err);
        return next(new HttpError('Could not save user', 500));
    }
    let token;
    try {
        token = await jwt.sign(
            { userId: user.id, email: user.email },
            'supersecret_dont_share',
            { expiresIn: '1h' }
        )
        res.status(201).json({
            message: "Signed Up", status: 'success',
            data: { user: user.toObject({ getters: true }), token }
        });

    } catch (e) {
        return next(new HttpError('Could not sign up, please try again.', 500));
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
    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, isUserExists.password);
    } catch (e) {
        return next(new HttpError('Could not login, please check your credentials and try again.', 500));
    }
    if (!isValidPassword) {
        return next(new HttpError('Invalid credentials, could not log you in.', 401));
    }
    let user;
    try {
        //get user
        user = await UserModel.findOne({ email: email, password: password });
        console.log('user', user, 'email', email, 'password', password);
        if (!user) {
            return next(new HttpError('Invalid credentials', 422));
        }
        res.status(200).json({
            message: 'Logged In ', status: 'success',
            data: { user: user.toObject({ getters: true }) }
        });
    } catch (err) {
        console.log(err);
        return next(new HttpError('Could not find user', 500));
    }
    let token;
    try {
        token = await jwt.sign(
            { userId: user.id, email: user.email },
            'supersecret_dont_share',
            { expiresIn: '1h' }
        )
        res.status(200).json({
            message: 'Logged In ', status: 'success',
            data: { user: user.toObject({ getters: true }), token }
        });

    } catch (e) {
        return next(new HttpError('Could not login, please try again.', 500));
    }
};

export { getAllUsers, getUserById, userSignup, userLogin };