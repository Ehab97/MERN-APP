import React from "react";
import { useForm } from "../../app/hooks/useForm";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from "../../utlis/validations/validator";
import Button from "../shared/UIElements/Button";
import Card from "../shared/UIElements/Card";
import { Input } from "../shared/UIElements/Input";
import "../../styles/users-list.scss";
import { AuthContext } from "../shared/context/auth.context";

export const Auth: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const auth=React.useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = React.useState(true);
  const [formState, inputHandler,setFormData] = useForm(
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

  const authSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("formState", formState,formState.isValid); //send this to back end
    auth.login();
  };
  // if(loading) {
    //   return (<div className="center">
    //     <Card>
    //       <h2>Loading...</h2>
    //     </Card>
    //   </div>)
    // }
    const switchModeHandler = () => {
      if (!isLoginMode) {
        setFormData({
          ...formState.inputs,
          name: undefined,
        },formState.inputs.email.isValid && formState.inputs.password.isValid);
      } else {
        setFormData({
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          }
        },false);
        auth.login();
      }  
    setIsLoginMode((prevMode) => !prevMode);
    }
  return (
    <Card className="authentication">
      <h2>Login Required </h2>
      <hr />
      <form  onSubmit={authSubmitHandler}>
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
          {isLoginMode? 'Login':'Sign Up'}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>Switch to {isLoginMode?'Sign up':'Login'}</Button>
    </Card>
  );
};
