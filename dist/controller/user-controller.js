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
exports.userLogin = exports.userSignup = exports.getUserById = exports.getAllUsers = void 0;
const express_validator_1 = require("express-validator");
const http_error_1 = __importDefault(require("./../models/http-error"));
const user_schema_1 = __importDefault(require("../models/user-schema"));
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
    const { name, email, password, image } = body;
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
    try {
        const user = new user_schema_1.default(createdUser);
        yield user.save();
        // deleteImage(req);
        res.status(201).json({ message: "Signed Up", status: 'success', data: { user: createdUser } });
    }
    catch (err) {
        console.log(err);
        return next(new http_error_1.default('Could not save user', 500));
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
    try {
        //get user
        const user = yield user_schema_1.default.findOne({ email: email, password: password });
        console.log('user', user, 'email', email, 'password', password);
        if (!user) {
            return next(new http_error_1.default('Invalid credentials', 422));
        }
        res.status(200).json({ message: 'Logged In ', status: 'success', data: { user: user } });
    }
    catch (err) {
        console.log(err);
        return next(new http_error_1.default('Could not find user', 500));
    }
});
exports.userLogin = userLogin;
