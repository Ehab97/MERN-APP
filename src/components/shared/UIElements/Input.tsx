import React from "react";
import { actionCreators } from "../../../store";
import { validate } from "../../../utlis/validations/validator";

import "./input.scss";

interface InputProps {
  name?: string;
  type?: string;
  inputValue?: string;
  onInput?: (x: any, y: any, z: any) => void;
  onChange?: (x: any) => void;
  placeholder?: string;
  className?: string;
  style?: object;
  label?: string;
  labelClass?: string;
  id?: string;
  element?: "input" | "textarea" | "select";
  row?: number;
  errorText?: string;
  validators?: any[];
  valid?: boolean;
  inputValid?: boolean;
}
const inputReducer = (state: any, action: any) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};
export const Input: React.FC<InputProps> = ({
  name,
  type = "text",
  inputValue,
  onInput,
  placeholder,
  className,
  style,
  label,
  labelClass,
  id,
  element,
  row = 3,
  errorText,
  validators,
  valid,
  inputValid,
  onChange,
}) => {
  let elementType;
  const [inputState, dispatch] = React.useReducer(inputReducer, {
    value: inputValue || "",
    isValid: inputValid || false,
    isTouched: false,
  });
  const changeHandler = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    dispatch({
      type: "CHANGE",
      value: event.target.value,
      validators,
    });
    console.log("inputState", label, type, inputState);
  };
  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };
  const { value, isValid } = inputState;
  React.useEffect(() => {
    onInput?.(id, value, isValid);
  }, [id, onInput, value, isValid]);
  if (element === "input") {
    elementType = (
      <input
        //  name={name}
        type={type}
        value={inputState.value}
        onChange={changeHandler || onChange}
        onBlur={touchHandler}
        placeholder={placeholder}
        //  className={className}
        //  style={style}
        id={id}
      />
    );
  } else if (element === "textarea") {
    elementType = (
      <textarea
        //  name={name}
        value={inputState.value}
        onChange={changeHandler || onChange}
        onBlur={touchHandler}
        placeholder={placeholder}
        //  className={className}
        //  style={style}
        id={id}
        rows={row}
      />
    );
  } else if (element === "select") {
  }

  return (
    <div
      className={`form-control 
     ${
       !inputState.isValid && inputState.isTouched
         ? "form-control--invalid"
         : ""
     }`}
    >
      <label htmlFor={id}>{label}</label>
      {elementType}
      {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
    </div>
  );
};
