import React from "react";
import { UsersList } from "./UsersList";
import { User } from './userInterfaces';



import '../../styles/users-list.scss';
interface Users{
    users:User[]
}
export const Users: React.FC = () => {
    const USERS:User[] = [
        {
            id: 'u1',
            name: 'Max Schwarzmüller',
            image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            placesCount: 3,
        },
        {
            id: 'u2',
            name: 'Ehab Reda',
            image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            placesCount: 1,
        },{
            id: 'u3',
            name: 'John Doe',
            image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            placesCount: 0,
        }
    ];
    return (
        <div>
            <UsersList users={USERS}/>
        </div>
    );
}