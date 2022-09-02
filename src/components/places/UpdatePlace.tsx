import React from "react";
import { useParams } from "react-router-dom";
import { Input } from "../shared/UIElements/Input";
import { Place } from "./placesInterFace";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../utlis/validations/validator";
import Button from "../shared/UIElements/Button";
import { useForm } from "../../app/hooks/useForm";

import "../../styles/places.scss";
import Card from "../shared/UIElements/Card";

const places: Place[] = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001",
    creatorId: "u1",
    coordinates: {
      lat: "40.7484405",
      lng: "-73.9878584",
    },
  },
  {
    id: "p2",
    title: "Empire State Building 2",
    description: "One of the most famous sky scrapers in the world! 2",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001",
    creatorId: "u2",
    coordinates: {
      lat: "40.7484405",
      lng: "-73.9878584",
    },
  },
];
const UpdatePlace: React.FC = () => {
  const [loading,setLoading]=React.useState(true)
  const { placeId } = useParams();
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const place = places.find((p) => p.id === placeId);
  React.useEffect(() => {
     if(place){
      setFormData({
        title: {
          value: place?.title || "",
          isValid: place ? true : false,
        },
        description: {
          value:place?.description || "",
          isValid: place ? true : false,
        },
      },true)
      setLoading(false)
     }
  },[setFormData,place])
  const placeSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("formState", formState); //send this to back end
  };

  if(loading) {
    return (<div className="center">
      <Card>
        <h2>Loading...</h2>
      </Card>
    </div>)
  }
  if(!place) {
    return (<div className="center">
      <Card>
        <h2 className="text-xl">Place not found</h2>
      </Card>
      </div>)
  }
    return (
        <form className="place-form" onSubmit={placeSubmitHandler}>
          <Input
            id="title"
            element="input"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter A valid title"
            onInput={inputHandler}
            inputValue={formState.inputs.title.value}
            inputValid={formState.inputs.title.isValid}
            valid={true}
          />
       
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please Enter A valid description at least 5 chars"
            onInput={inputHandler}
            inputValue={formState.inputs.description.value}
            inputValid={formState.inputs.description.isValid}
            valid={true}
          />
          <Button type="submit" disabled={!formState.isValid} inverse={true}>
            Update Place
          </Button>
        </form>
      )
  
};

export default UpdatePlace;
