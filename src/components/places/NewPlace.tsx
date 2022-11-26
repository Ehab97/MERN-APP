import React, { useContext } from "react";
import { Input } from "../shared/UIElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../utlis/validations/validator";
import Button from "../shared/UIElements/Button";
import { useForm } from "../../app/hooks/useForm";
import { useHttpClient } from "../../app/hooks/useHttpClient";
import { AuthContext } from "../shared/context/auth.context";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";
import ErrorModal from "../shared/UIElements/ErrorModal";
import { useNavigate } from "react-router-dom";
import { ImageUpload } from "../shared/form/ImageUpload";

export const NewPlace: React.FC = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const placeSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    console.log("formState", formState, auth); //send this to back end
    let title = formState.inputs.title.value;
    let address = formState.inputs.address.value;
    let description = formState.inputs.description.value;
    let image = formState.inputs.image.value;
    let formData = new FormData();
    let creator = auth.userId;
    formData.append("title", title);
    formData.append("address", address);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("creator", creator);
    console.log(title, address, description, image, creator, formData, auth);
    try {
      let res: any = await sendRequest(
        "http://localhost:5000/api/places",
        "POST",
        formData,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      console.log(res);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  const modalProps: any = {
    error,
    onClear: clearError,
  };
  return (
    <>
      <ErrorModal {...modalProps} />
      {isLoading && <LoadingSpinner asOverlay={true} />}
      <form className="place-form" onSubmit={placeSubmitHandler}>
        <Input
          label="Title"
          element="input"
          id="title"
          onInput={inputHandler}
          errorText={`please enter valid text`}
          validators={[VALIDATOR_REQUIRE()]}
        />
        <Input
          label="Address"
          element="input"
          id="address"
          onInput={inputHandler}
          errorText={`please enter a valid address`}
          validators={[VALIDATOR_REQUIRE()]}
        />
        <Input
          label="Description"
          element="textarea"
          id="description"
          onInput={inputHandler}
          errorText={`please enter at least five characters text`}
          validators={[VALIDATOR_MINLENGTH(5)]}
        />
        <ImageUpload
          id={"image"}
          center={false}
          onInput={inputHandler}
          errorText={"please Enter An image"}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </>
  );
};
