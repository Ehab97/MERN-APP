import React,{useCallback,useReducer} from  'react';

const formReducer = (state: any, action: any) => {
    switch (action.type) {
    
    case 'INPUT_CHANGE':
            let formIsValid = true;
            for (const inputId in state.inputs) {
              if(!state.inputs[inputId]) {
                continue;
              }
              if (inputId === action.inputId) {
                formIsValid = formIsValid && action.isValid;
              } else {
                formIsValid = formIsValid && state.inputs[inputId].isValid;
              }
            }
            return {
              ...state,
              inputs: {
                ...state.inputs,
                [action.inputId]: { value: action.value, isValid: action.isValid }
              },
              isValid: formIsValid
            };
    case 'SET_DATA':
                return{
                    inputs:action.inputs,
                    isValid:action.formIsValid
                }
      default:
        return state;
    }
  };

export const useForm = (initialState: any, initialFormValidity:boolean) => {
    const [formState,dispatch ]=React.useReducer(formReducer,{
        inputs: initialState,
        isValid: initialFormValidity
    })
    const inputHandler = React.useCallback((id, value, isValid) => {
        dispatch({
          type: 'INPUT_CHANGE',
          value: value,
          isValid: isValid,
          inputId: id
        });
      }, []);
     const setFormData=useCallback((inputData:any,formValidity:any)=>{
            dispatch({
                type:'SET_DATA',
                inputs:inputData,
                isValid:formValidity
            })
     },[]) 
    return [formState,inputHandler,setFormData];
} 