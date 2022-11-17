import React from 'react';
import Modal from "./Modal";
import Button from "./Button";

interface Props {
    onClear: () => void;
    error: string;
}

const ErrorModal:React.FC=(props:any)=>{
    const  modalProps:any={
        onCancel:props.onClear,
        header:"An Error Occurred!",
        show:!!props.error,
        footer:<Button onClick={props.onClear}>Okay</Button>

    }
    return (
        <Modal {...modalProps}>
            <p>{props.error}</p>
        </Modal>
    );
}
export default ErrorModal;
