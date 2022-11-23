import React, { useRef, useState, useEffect } from "react";

import "./imageUpload.css";
import Button from "../UIElements/Button";
interface Props {
  id: string;
  center: boolean;
  onInput: (id: string, file: any, isValid: boolean) => void;
  errorText: string;
}

interface Files {
  file: Blob | HTMLInputElement;
}

export const ImageUpload: React.FC<Props> = ({
  id,
  center,
  onInput,
  errorText,
}) => {
  const filePickerRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [file, setFile] = useState<any>();
  const [previewUrl, setPreviewUrl] = useState<any>();
  const [isValid, setIsValid] = useState<boolean>(false);
  const pickImageHandler = () => {
    filePickerRef.current?.click();
  };

  const pickedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target);
    let pickedFile: any;
    let fileIsValid: boolean = isValid;
    if (event.target.files && event.target.files?.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    console.log(id, pickedFile, fileIsValid);
    onInput(id, pickedFile, fileIsValid);
  };
  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);
  return (
    <div className={`form-control`}>
      <input
        type={"file"}
        ref={filePickerRef}
        id={id}
        style={{ display: "none" }}
        accept={`.jpg,.png,.jpeg`}
        onChange={pickedHandler}
      />
      <div className={`image-upload ${center && "center"}`}>
        <div className={`image-upload__preview`}>
          {previewUrl && <img src={previewUrl} alt={"preview"} />}
          {!previewUrl && <p>Please Pick an Image</p>}
        </div>
        <Button type={"button"} onClick={pickImageHandler} inverse>
          Pick Image
        </Button>
      </div>
      {!isValid && <p>{errorText}</p>}
    </div>
  );
};
