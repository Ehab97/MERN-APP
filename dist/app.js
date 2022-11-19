"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const places_routes_1 = __importDefault(require("./routes/places-routes"));
const users_routes_1 = __importDefault(require("./routes/users-routes"));
const http_error_1 = __importDefault(require("./models/http-error"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
//define constants
const PORT = process.env.PORT ? +process.env.PORT : 5000;
const HOSTNAME = process.env.HOSTNAME || 'localhost';
const DB_URL = "mongodb://127.0.0.1:27017";
const DB_NAME = "places";
//end of constants
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});
app.use('/api/places', places_routes_1.default); // =>     it runs only if the path starts with /api/places
app.use('/api/users', users_routes_1.default); // =>     it runs only if the path starts with /api/users
//handle undefined routes
app.use((req, res, next) => {
    const error = new http_error_1.default('Could not find this route', 404);
    throw error;
});
//handle errors
app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    res.status((error === null || error === void 0 ? void 0 : error.errorCode) || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});
//connect db and start server
mongoose_1.default
    .connect(DB_URL + "/" + DB_NAME)
    .then((res) => {
    console.log("Connected to DB");
    app.listen(PORT, HOSTNAME, () => {
        console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
    });
})
    .catch((err) => {
    console.log(err);
});
