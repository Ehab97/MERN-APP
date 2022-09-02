import React from 'react'
import { useForm } from '../../app/hooks/useForm';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from '../../utlis/validations/validator';
import Button from '../shared/UIElements/Button';
import Card from '../shared/UIElements/Card';
import { Input } from '../shared/UIElements/Input';
import '../../styles/users-list.scss';
export const Auth:React.FC = () => {
    
    const [loading,setLoading]=React.useState(true)
    const [formState, inputHandler] = useForm(
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
 

    const placeSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log("formState", formState); //send this to back end
    };
  
    // if(loading) {
    //   return (<div className="center">
    //     <Card>
    //       <h2>Loading...</h2>
    //     </Card>
    //   </div>)
    // }

      return (<Card>
        <h2>Login Required </h2>
        <hr/>
          <form className="authentication" onSubmit={placeSubmitHandler}>
            <Input
              id="email"
              element="input"
              label="E-mail"
            type='email' 
              validators={[VALIDATOR_REQUIRE(),VALIDATOR_EMAIL()]}
              errorText="Please Enter A valid Email"
              onChange={inputHandler}
            //   inputValue={formState.inputs.title.value}
            //   inputValid={formState.inputs.title.isValid}
    
            />
            <Input
              id="password"
              element="input"
              label="Password"
               type='password' 
              validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(8)]}
              errorText="Please Enter At lease 8 chars"
              onChange={inputHandler}
            //   inputValue={formState.inputs.title.value}
            //   inputValid={formState.inputs.title.isValid}
         
            />
         
          
            <Button type="submit" disabled={!formState.isValid} inverse={true}>
              Login
            </Button>
          </form>
      </Card>
        )
}
