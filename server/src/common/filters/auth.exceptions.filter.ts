import { Catch, HttpException, ExceptionFilter, ArgumentsHost, UnauthorizedException, ForbiddenException, HttpStatus } from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class AuthExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    if (
      exception instanceof UnauthorizedException ||
      exception instanceof ForbiddenException
    ) {
      response.status(exception.getStatus()).json({ message: exception.getResponse() });
    } else {
      // TODO: extend auth exception filters 
      console.error(exception);
      response.status(HttpStatus.FORBIDDEN).json({ message: 'Forbidden' });
    }
  }
}