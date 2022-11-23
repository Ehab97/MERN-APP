import React, { useContext } from "react";

import { NavLink } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth.context";

import "../../../styles/header.scss";

export const NavLinkItem: React.FC = () => {
  const auth = useContext(AuthContext);
  const { isLoggedIn } = auth;
  const linksItemAuthed = [
    { to: "/", label: "All Users", exact: true },
    { to: "/places/new", label: "Add Place", exact: false, auth: true },
    {
      to: `/${auth.userId}/places`,
      label: "My Places",
      exact: false,
      auth: true,
    },
    { to: "/auth", label: "Logout", exact: false, auth: true },
  ];
  const linksItemNotAuthed = [
    { to: "/", label: "All Users", exact: true },
    { to: "/auth", label: "Login", exact: false, auth: false },
  ];
  const showLinks = (arrLinks: any) =>
    React.Children.toArray(
      arrLinks.map((link: any) => (
        <li>
          <NavLink
            onClick={() => (link.label === "Logout" ? auth.logout() : null)}
            to={link.to}
            className={(navData) => (navData.isActive ? "active" : "")}
          >
            {link.label}
          </NavLink>
        </li>
      ))
    );
  const linksItem = () =>
    isLoggedIn ? showLinks(linksItemAuthed) : showLinks(linksItemNotAuthed);
  return <ul className="nav-links">{linksItem()}</ul>;
};
