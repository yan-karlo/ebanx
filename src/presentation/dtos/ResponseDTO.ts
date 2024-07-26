interface IResponseDTO <T>{
  code: number;       // http status code
  data: T | null;     // the data to be sent back
  isError: boolean;   // error flag
  error?:{
    msg?: string;        // msg about the error
    originalMsg?: string // system error msg (if applicable)
    stack?: string;      // where the error has occurred
  }
}
export class ResponseDTO<T> implements IResponseDTO<T> {
  public code: number = 0;
  public data: T | null = null;
  public isError: boolean = false;
  public error:{
    msg?: string;
    originalMsg?: string
    stack?: string;     
  } = {}

  constructor(event? : Partial<IResponseDTO<T>>){
    if(event) Object.assign(this,event);
  }
}