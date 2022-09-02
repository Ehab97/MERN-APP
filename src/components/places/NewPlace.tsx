import React from "react";
import { Input } from "../shared/UIElements/Input";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../utlis/validations/validator';
import Button from "../shared/UIElements/Button";
import { useForm } from "../../app/hooks/useForm";



export const NewPlace: React.FC = () => {

    const [formState,inputHandler]=useForm({
        title: {
          value: '',
          isValid: false
        },
        description: {
          value: '',
          isValid: false
        },
        address: {
          value: '',
          isValid: false
        }
      },false);

 
       const placeSubmitHandler=(event: React.FormEvent<HTMLFormElement>)=>{
            event.preventDefault();
            console.log('formState',formState)//send this to back end
        }
    return (
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
           <Button type="submit" disabled={!formState.isValid}>
                ADD PLACE
            </Button>
        </form>
    );
}