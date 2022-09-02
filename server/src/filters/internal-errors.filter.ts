import { ExceptionFilter, Catch, ArgumentsHost, Inject } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { TypeORMError } from 'typeorm';
import { Logger } from 'winston';

/*
  Catch all non-logic errors (Typeorm) TODO: add external payments error
*/

@Catch(TypeORMError)
export class InternalServerErrorFilter implements ExceptionFilter {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger) { }
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const request = host.switchToHttp().getRequest();
    const message: string = (exception as TypeORMError).message;
    const code: number = (exception as any).code;
    this.logger.error(`${code}: ${message} for request ${JSON.stringify(request.body)}`);
    const customResponse = {
      status: 500,
      message: 'Something Went Wrong',
      type: 'Internal Server Error',
      errors: [{ code: code, message: message }],
      errorCode: 300,
      timestamp: new Date().toISOString(),
    };
    response.status(customResponse.status).json(customResponse);
  }
}
