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
const axios_1 = __importDefault(require("axios"));
const http_error_1 = __importDefault(require("./../models/http-error"));
const API_KEY = 'AIzaSyCwwLnetwv43XOq1JP2KuPmgy8C1YuinCU';
function getCoordsForAddress(address) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`);
        const data = response.data;
        let error;
        if (!data || data.status === 'ZERO_RESULTS') {
            error = new http_error_1.default('Could not find location for the specified address', 422);
            throw error;
        }
        return {
            lat: 40.7484474,
            lng: -73.9871516
        };
        //in case we have billing enabled
        const coordinates = (_a = data.results[0].geometry) === null || _a === void 0 ? void 0 : _a.location;
        console.log(coordinates);
        return coordinates;
    });
}
exports.default = getCoordsForAddress;
