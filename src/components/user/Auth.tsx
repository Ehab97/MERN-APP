import React from "react";
import { useForm } from "../../app/hooks/useForm";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
} from "../../utlis/validations/validator";
import Button from "../shared/UIElements/Button";
import Card from "../shared/UIElements/Card";
import { Input } from "../shared/UIElements/Input";
import { AuthContext } from "../shared/context/auth.context";
import { useNavigate } from "react-router-dom";
import client from "../../utlis/api";
import "../../styles/users-list.scss";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";
import ErrorModal from "../shared/UIElements/ErrorModal";
import axios from "axios";
import { useHttpClient } from "../../app/hooks/useHttpClient";

export const Auth: React.FC = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();
  const auth = React.useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = React.useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = formState.inputs?.name?.value;
    const email = formState.inputs.email.value;
    const password = formState.inputs.password.value;
    let data, res;

    if (isLoginMode) {
      try {
        res = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          JSON.stringify({ email, password }),
          {
            Accept: "application/json",
            "Content-Type": "application/json",
          }
        );
        console.log(res);
        auth.login();
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        res = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          JSON.stringify({ name, email, password }),
          {
            Accept: "application/json",
            "Content-Type": "application/json",
          }
        );
        console.log(res);
        auth.login();
        navigate("/");
      } catch (e) {
        console.log(e);
      }
    }

    console.log("formState", formState, formState.isValid, res); //send this to back end
  };

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
      auth.login();
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const modalProps: any = {
    error,
    onClear: clearError,
  };
  return (
    <>
      <ErrorModal {...modalProps} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay={true} />}
        <h2>Login Required </h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          )}
          <Input
            id="email"
            element="input"
            label="E-mail"
            type="email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please Enter A valid Email"
            onInput={inputHandler}
            //   inputValue={formState.inputs.title.value}
            //   inputValid={formState.inputs.title.isValid}
          />
          <Input
            id="password"
            element="input"
            label="Password"
            type="password"
            validators={[VALIDATOR_MINLENGTH(8)]}
            errorText="Please Enter At lease 8 chars"
            onInput={inputHandler}
            //   inputValue={formState.inputs.title.value}
            //   inputValid={formState.inputs.title.isValid}
          />

          <Button type="submit" disabled={!formState.isValid} inverse>
            {isLoginMode ? "Login" : "Sign Up"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          Switch to {isLoginMode ? "Sign up" : "Login"}
        </Button>
      </Card>
    </>
  );
};
