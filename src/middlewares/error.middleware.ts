import { Request, NextFunction, Response } from "express";
import { CustomErrorInterface } from "../interfaces/custom-error";
function errorMiddleware(error: CustomErrorInterface, req: Request, res: Response, next: NextFunction) {
    const statusCode = error.status || 500;
    const message = error.message || 'Something went wrong';
    const errors = error.errors
    const metadata = error.metadata
    return res.status(statusCode).json({ 
        success: false,
        message,
        error_code: error.errorCode || "UNKNOWN",
        status_code: statusCode,
        error:errors,
        metadata
     });
}



export default errorMiddleware;
