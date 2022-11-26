"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_controller_1 = require("../controller/user-controller");
const file_upload_1 = __importDefault(require("../middleware/file-upload"));
//define routes
const router = (0, express_1.Router)();
//get single user with id
router.get('/:userId', user_controller_1.getUserById);
// router.get('/user/:userId', getPlacesUserById);
//user signup
router.post('/signup', file_upload_1.default.single('image'), [
    (0, express_validator_1.check)('name').isLength({ min: 3 }),
    (0, express_validator_1.check)('email').normalizeEmail().isEmail(),
    (0, express_validator_1.check)('password').isLength({ min: 6 })
], user_controller_1.userSignup);
//user login
router.post('/login', [
    (0, express_validator_1.check)('email').normalizeEmail().isEmail(),
    (0, express_validator_1.check)('password').isLength({ min: 6 })
], user_controller_1.userLogin);
//get all users
router.get('/', user_controller_1.getAllUsers);
exports.default = router;
