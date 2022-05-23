export class ResponseModel<T> {
  status_code: string;
  message: string;
  data: T;

  constructor(status_code: string, message: string, data: T) {
    this.status_code = status_code;
    this.message = message;
    this.data = data;
  }
}
