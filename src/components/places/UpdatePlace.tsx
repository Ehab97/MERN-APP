import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../shared/UIElements/Input";
import { Place } from "./placesInterFace";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../utlis/validations/validator";
import Button from "../shared/UIElements/Button";
import { useForm } from "../../app/hooks/useForm";

import "../../styles/places.scss";
import Card from "../shared/UIElements/Card";
import { useHttpClient } from "../../app/hooks/useHttpClient";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";
import { AuthContext } from "../shared/context/auth.context";
import ErrorModal from "../shared/UIElements/ErrorModal";

const UpdatePlace: React.FC = () => {
  const { placeId } = useParams();
  const auth = useContext(AuthContext);
  const place = auth.places.find((p) => p._id === placeId);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: place?.title,
        isValid: false,
      },
      description: {
        value: place?.description,
        isValid: false,
      },
      address: {
        value: place?.address,
        isValid: place ? true : false,
      },
      image: {
        value: place?.image,
        isValid: false,
      },
    },
    false
  );
  React.useEffect(() => {
    console.log(place);
    if (place) {
      setFormData(
        {
          title: {
            value: place.title,
            isValid: place ? true : false,
          },
          description: {
            value: place.description,
            isValid: place ? true : false,
          },
          address: {
            value: place.address,
            isValid: place ? true : false,
          },
          image: {
            value: place?.image,
            isValid: false,
          },
        },
        true
      );
    }
  }, [setFormData, place]);

  const placeSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    let title = formState.inputs.title.value;
    let description = formState.inputs.description.value;
    let imageUrl = formState.inputs.image.value;
    let address = formState.inputs.address.value;
    console.log("formState", formState); //send this to back end
    try {
      let res: any = await sendRequest(
        `http://localhost:5000/api/places/${placeId}`,
        "PATCH",
        JSON.stringify({ title, description, address }),
        {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      );
      console.log(res);
      navigate(`/${auth.userId}/places`);
    } catch (e) {
      console.log(e);
    }
  };
  const modalProps: any = {
    error,
    onClear: clearError,
  };
  if (isLoading) {
    return (
      <div className="center">
        <Card>
          <LoadingSpinner asOverlay={true} />
        </Card>
      </div>
    );
  }
  if (!place) {
    return (
      <div className="center">
        <Card>
          <h2 className="text-xl">Place not found</h2>
        </Card>
      </div>
    );
  }
  return (
    <>
      <ErrorModal {...modalProps} />
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

        <Input
          id="address"
          element="textarea"
          label="Address"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please Enter A valid description at least 5 chars"
          onInput={inputHandler}
          inputValue={formState.inputs.address.value}
          inputValid={formState.inputs.address.isValid}
          valid={true}
        />

        {/*<Input*/}
        {/*  id="imageUrl"*/}
        {/*  element="textarea"*/}
        {/*  label="Image"*/}
        {/*  validators={[VALIDATOR_MINLENGTH(10)]}*/}
        {/*  errorText="Please Enter A valid description at least 10 chars"*/}
        {/*  onInput={inputHandler}*/}
        {/*  inputValue={formState.inputs.image.value}*/}
        {/*  inputValid={formState.inputs.image.isValid}*/}
        {/*  valid={true}*/}
        {/*/>*/}

        <Button type="submit" disabled={!formState.isValid} inverse={true}>
          Update Place
        </Button>
      </form>
    </>
  );
};

export default UpdatePlace;
