export interface CustomErrorInterface {
  status?: number;          // optional legacy/status
  statusCode?: number;      // for HttpError
  errorCode?: string;
  errors?: any;
  message?: string;
  metadata?: any;
}


export class CustomError extends Error {
  status: number
  errorCode: string
  errors?: any
  metadata?: any
  
  constructor(status: number, message?: string, errorCode?: string, errors?: any, metadata?:any) {
    super(message)
    this.status = status || 500
    this.errorCode = errorCode || "UNKNOWN"
    this.message = message || 'Something went wrong'
    this.errors = errors
    this.metadata = metadata;
  }

  setStatusCode(statusCode: number) {
    this.status = statusCode
  }

  setErrorCode(errorCode: string) {
    this.errorCode = errorCode
  }

  setMessage(message: string) {
    this.message = message
  }

  setMetadata(data: any) {
    this.metadata = data
  }
}