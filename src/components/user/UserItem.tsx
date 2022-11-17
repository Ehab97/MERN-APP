import React from "react";
import "../../styles/users-list.scss";
import Avatar from "../shared/UIElements/Avatar";
import { User } from "./userInterfaces";
import { NavLink } from "react-router-dom";
import Card from "../shared/UIElements/Card";

export const UsersItem: React.FC<User> = ({
  name,
  id,
  image,
  places,
  email,
}) => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <NavLink to={`/${id}/places`}>
          <div className="user-item__image">
            <Avatar
              image={image}
              alt={name}
              width={"50px"}
              className=""
              style={{ borderRadius: "10%" }}
            />
          </div>
          <div className="user-item__info">
            <h2 className="user-item__name">{name}</h2>
            {/*<h2 className="user-item__name">{email}</h2>*/}
            <h3 className="user-item__places">
              {places?.length} {places?.length !== 1 ? "places" : "place"}
            </h3>
          </div>
        </NavLink>
      </Card>
    </li>
  );
};
