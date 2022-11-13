class HttpError extends Error{
    constructor(message:string,public errorCode:number){
        super(message); //Add a "message" property
        this.errorCode = errorCode;
    }

}

export default HttpError;