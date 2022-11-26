import express from 'express';
import HttpError from '../models/http-error';
import jwt from 'jsonwebtoken';

export const checkAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.method == 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new Error('Authentication failed');
        }
        const decodedToken = jwt.verify(token, 'supersecret_dont_share');
        console.log(decodedToken)
        req.body.userData = decodedToken;
        next();
    } catch (e) {
        console.log('err', e)
        return next(new HttpError('Not authenticated', 403));
    }

}