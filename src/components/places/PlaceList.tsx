import React from "react";
import Card from "../shared/UIElements/Card";
import { NavLink } from "react-router-dom";
import PlaceItem from "./PlaceItem";
import { Place } from "./placesInterFace";

import "../../styles/places.scss";
import Button from "../shared/UIElements/Button";

interface PlaceItemProps {
  places: Place[];
  onDeletePlace: (deleteID?: string) => void;
}

const PlaceList: React.FC<PlaceItemProps> = ({ places, onDeletePlace }) => {
  if (places.length === 0) {
    return (
      <div className="place-list center">
        <Card className="w-100 h-48 d-flex justify-center items-center">
          <h2>No places found. Maybe create one?</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  }
  return (
    <ul className="place-list">
      {React.Children.toArray(
        places.map((place: Place) => (
          <PlaceItem
            id={place._id}
            image={place.image}
            title={place.title}
            description={place.description}
            address={place.address}
            creator={place.creator}
            coordinates={place.coordinates}
            onDelete={onDeletePlace}
          />
        ))
      )}
    </ul>
  );
};

export default PlaceList;
