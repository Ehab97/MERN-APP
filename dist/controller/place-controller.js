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
exports.getAllPlaces = exports.updatePlaceById = exports.deletePlaceById = exports.createNewPlace = exports.getPlacesByUserId = exports.getPlaceById = void 0;
const crypto_1 = __importDefault(require("crypto"));
const express_validator_1 = require("express-validator");
const http_error_1 = __importDefault(require("../models/http-error"));
const location_1 = __importDefault(require("../utils/location"));
const place_schema_1 = __importDefault(require("../models/place-schema"));
const user_schema_1 = __importDefault(require("../models/user-schema"));
const fs_1 = __importDefault(require("fs"));
const getAllPlaces = (req, res, next) => {
    place_schema_1.default.find({}, (err, places) => {
        if (err) {
            console.log('err', err);
            return next(new http_error_1.default('Could not find places', 500));
        }
        res.json({ status: 'success', data: { places: places } });
    });
};
exports.getAllPlaces = getAllPlaces;
const getPlaceById = (req, res, next) => {
    const params = req.params;
    const placeId = params.placeId;
    place_schema_1.default.findById(placeId, (err, place) => {
        if (err) {
            return next(new http_error_1.default('Could not find place', 500));
        }
        res.json({ status: 'success', data: { place: place } });
    });
};
exports.getPlaceById = getPlaceById;
const getPlacesByUserId = (req, res, next) => {
    const params = req.params;
    const userId = params.userId;
    place_schema_1.default.find({ creator: userId }, (err, places) => {
        if (err) {
            return next(new http_error_1.default('Could not find places', 500));
        }
        res.json({ status: 'success', data: { places: places } });
    });
};
exports.getPlacesByUserId = getPlacesByUserId;
const createNewPlace = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const errors = (0, express_validator_1.validationResult)(req);
    let error;
    console.log('errors', errors);
    if (!errors.isEmpty()) {
        error = new http_error_1.default('Invalid inputs passed, please check your data.', 422);
        return next(error);
    }
    const body = req.body;
    console.log('body', body);
    const { title, description, location, address, creator, image } = body;
    const id = crypto_1.default.randomBytes(16).toString("hex");
    console.log(body);
    let coordinates;
    try {
        coordinates = yield (0, location_1.default)(address);
    }
    catch (error) {
        console.log(error);
        return next(error);
    }
    const createdPlace = {
        title,
        description,
        location: coordinates,
        address,
        creator,
        image: (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path,
    };
    console.log(createdPlace);
    let user;
    try {
        user = yield user_schema_1.default.findById(creator);
    }
    catch (err) {
        let error = new http_error_1.default('error in create place', 500);
        return next(error);
    }
    console.log(user);
    if (!user) {
        let error = new http_error_1.default('Could not find user', 500);
        return next(error);
    }
    const place = new place_schema_1.default(createdPlace);
    //1 create  place and check if it is created or not
    try {
        yield place.save();
    }
    catch (err) {
        let error = new http_error_1.default('error in create place', 500);
        console.log('err', err);
        return next(error);
    }
    //2 add place to user
    (_b = user === null || user === void 0 ? void 0 : user.places) === null || _b === void 0 ? void 0 : _b.push(place);
    //3 save user
    yield user.save();
    res.status(201).json({
        status: 'success',
        data: {
            place: createdPlace
        }
    });
});
exports.createNewPlace = createNewPlace;
const updatePlaceById = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        throw new http_error_1.default('Invalid inputs passed, please check your data.', 422);
    }
    const params = req.params;
    const placeId = params.placeId;
    const body = req.body;
    const { title, description } = body;
    console.log(body);
    place_schema_1.default
        .updateOne({ _id: placeId }, { title, description })
        .then((result) => {
        res.status(200).json({ status: 'success', data: {
                result
            } });
    })
        .catch((err) => {
        let error = new http_error_1.default('Could not update place', 500);
        return next(error);
    });
};
exports.updatePlaceById = updatePlaceById;
const deletePlaceById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const placeId = params.placeId;
    let place;
    console.log(placeId);
    place = yield place_schema_1.default.findById(placeId);
    if (!place) {
        let error = new http_error_1.default('Could not find place', 500);
        return next(error);
    }
    const imagePath = place.image;
    // let place;
    try {
        // place = await PlaceModel.findById(placeId).populate('creator');
        yield place_schema_1.default.deleteOne({ _id: placeId });
    }
    catch (err) {
        let error = new http_error_1.default('Could not delete place', 500);
        return next(error);
    }
    // await UserModel.updateMany({}, { $pull: { 'users.places': placeId } })
    yield user_schema_1.default.updateMany({}, { $pull: { places: placeId } });
    fs_1.default.unlink(imagePath, (err) => {
        console.log(err);
    });
    res.status(200).json({ status: 'success', message: 'Deleted place' });
});
exports.deletePlaceById = deletePlaceById;
