"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlacesUserById = exports.userLogin = exports.userSignup = exports.getUserById = exports.getAllUsers = void 0;
const express_validator_1 = require("express-validator");
const http_error_1 = __importDefault(require("./../models/http-error"));
const user_schema_1 = __importDefault(require("../models/user-schema"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const place_schema_1 = __importDefault(require("../models/place-schema"));
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_schema_1.default.find({}, '-password');
        console.log('users', users);
        res.status(200).json({ status: 'success', data: { users: users } });
    }
    catch (err) {
        console.log('err', err);
        return next(new http_error_1.default('Could not find users', 500));
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const userId = params.userId;
    try {
        const user = yield user_schema_1.default.findById(userId, '-password');
        res.status(200).json({ status: 'success', data: { user: user } });
    }
    catch (err) {
        return next(new http_error_1.default('Could not find user', 500));
    }
});
exports.getUserById = getUserById;
const userSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        // throw new HttpError('Invalid inputs passed, please check your data.', 422);
        return next(new http_error_1.default('Invalid inputs passed, please check your data.', 422));
    }
    const body = req.body;
    const { name, email, password } = body;
    console.log('body', body);
    const createdUser = {
        name,
        email,
        password,
        image: (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path,
        places: []
    };
    console.log('createdUser', createdUser);
    //check if user already exists
    let isUserExists = yield user_schema_1.default.findOne({ email: email });
    if (isUserExists) {
        return next(new http_error_1.default('User already exists', 422));
    }
    console.log('isUserExists', isUserExists);
    let hashPassword;
    try {
        hashPassword = yield bcryptjs_1.default.hash(password, 12);
    }
    catch (e) {
        let error = new http_error_1.default('Could not create user, please try again.', 500);
        return next(error);
    }
    createdUser['password'] = hashPassword;
    let user;
    try {
        user = new user_schema_1.default(createdUser);
        yield user.save();
        // deleteImage(req);
    }
    catch (err) {
        console.log(err);
        return next(new http_error_1.default('Could not save user', 500));
    }
    let token;
    try {
        token = yield jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, 'supersecret_dont_share', { expiresIn: '1h' });
        console.log('user', user, token);
        res.status(201).json({
            message: "Signed Up", status: 'success',
            data: { user: user, token }
        });
    }
    catch (e) {
        return next(new http_error_1.default('Could not sign up, please try again.', 500));
    }
});
exports.userSignup = userSignup;
const userLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        throw new http_error_1.default('Invalid inputs passed, please check your data.', 422);
    }
    const body = req.body;
    const { email, password } = body;
    let isUserExists = yield user_schema_1.default.findOne({ email: email });
    if (!isUserExists) {
        return next(new http_error_1.default('User is not exists', 422));
    }
    let isValidPassword = false;
    try {
        isValidPassword = yield bcryptjs_1.default.compare(password, isUserExists.password);
    }
    catch (e) {
        return next(new http_error_1.default('Could not login, please check your credentials and try again.', 500));
    }
    console.log(isValidPassword, password, isUserExists.password);
    if (!isValidPassword) {
        return next(new http_error_1.default('Invalid credentials, could not log you in.', 403));
    }
    let user;
    try {
        //get user
        user = yield user_schema_1.default.findOne({ email: email });
        console.log('user', user, 'email', email, 'password', password);
        if (!user) {
            return next(new http_error_1.default('Invalid credentials', 422));
        }
        // res.status(200).json({
        //     message: 'Logged In ', status: 'success',
        //     data: { user: user.toObject({ getters: true }) }
        // });
    }
    catch (err) {
        console.log(err);
        return next(new http_error_1.default('Could not find user', 500));
    }
    let token;
    try {
        token = yield jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, 'supersecret_dont_share', { expiresIn: '1h' });
        res.status(200).json({
            message: 'Logged In ', status: 'success',
            data: { user: user.toObject({ getters: true }), token }
        });
    }
    catch (e) {
        return next(new http_error_1.default('Could not login, please try again.', 500));
    }
});
exports.userLogin = userLogin;
const getPlacesUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const userId = params.userId;
    let isUserExists = yield user_schema_1.default.findOne({ _id: userId });
    if (!isUserExists) {
        return next(new http_error_1.default('User is not  exists', 404));
    }
    let places;
    try {
        places = yield place_schema_1.default.find({ creator: userId });
        console.log('places', places);
    }
    catch (e) {
        return next(new http_error_1.default('Could not find places', 500));
    }
    res.status(200).json({
        status: 'success',
        data: { places }
    });
});
exports.getPlacesUserById = getPlacesUserById;
