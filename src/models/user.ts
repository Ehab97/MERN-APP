import { Place } from "./place";

export interface User{
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    image?: string;
    places?: any[];
}

export type RequestParams = { userId?: string ,userInfo?:User};