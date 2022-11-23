"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const place_controller_1 = require("../controller/place-controller");
const file_upload_1 = __importDefault(require("../middleware/file-upload"));
//define routes
const router = (0, express_1.Router)();
//get place with id
router.get('/:placeId', place_controller_1.getPlaceById);
//get places by user id
router.get('/user/:userId', place_controller_1.getPlacesByUserId);
//patch place
router.patch('/:placeId', [
    (0, express_validator_1.check)('title').not().isEmpty(),
    (0, express_validator_1.check)('description').isLength({ min: 5 }),
    (0, express_validator_1.check)('address').not().isEmpty()
], place_controller_1.updatePlaceById);
//delete place
router.delete('/:placeId', place_controller_1.deletePlaceById);
//get all places
router.get('/', place_controller_1.getAllPlaces);
//post place
router.post('/', file_upload_1.default.single('image'), [
    (0, express_validator_1.check)('title').not().isEmpty(),
    (0, express_validator_1.check)('description').isLength({ min: 5 }),
    (0, express_validator_1.check)('address').not().isEmpty()
], place_controller_1.createNewPlace);
exports.default = router;
