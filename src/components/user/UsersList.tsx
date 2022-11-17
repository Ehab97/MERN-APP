import React from "react";
import { UsersItem } from "./UserItem";
import { User } from "./userInterfaces";
import Card from "../shared/UIElements/Card";
interface Users {
  users: User[];
}

export const UsersList: React.FC<Users> = ({ users }) => {
  if (users.length === 0) {
    return (
      <Card>
        <h2 className="center">No user Found !!</h2>
      </Card>
    );
  } else {
    return (
      <ul className="users-list">
        {React.Children.toArray(
          users.map((user: User) => {
            return (
              <UsersItem
                name={user.name}
                id={user.id}
                image={user.image}
                places={user.places}
                email={user.email}
              />
            );
          })
        )}
      </ul>
    );
  }
};
