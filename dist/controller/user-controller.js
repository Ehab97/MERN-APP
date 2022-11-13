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
let DUMMY_USERS = [
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
];
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_schema_1.default.find({}, '-password');
        res.json({ users: users });
    }
    catch (err) {
        return next(new http_error_1.default('Could not find users', 500));
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const userId = params.userId;
    try {
        const user = yield user_schema_1.default.findById(userId, '-password');
        res.json({ user: user });
    }
    catch (err) {
        return next(new http_error_1.default('Could not find user', 500));
    }
});
exports.getUserById = getUserById;
const userSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        throw new http_error_1.default('Invalid inputs passed, please check your data.', 422);
    }
    const body = req.body;
    const { name, email, password, image } = body;
    console.log('body', body);
    const createdUser = {
        name,
        email,
        password,
        image: image || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
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
        res.status(201).json({ msg: "Signed Up", user: createdUser });
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
        const user = yield user_schema_1.default.findOne({ email: email, password: password });
        res.json({ msg: 'Logged In ', user: user });
    }
    catch (err) {
        console.log(err);
        return next(new http_error_1.default('Could not find user', 500));
    }
});
exports.userLogin = userLogin;
