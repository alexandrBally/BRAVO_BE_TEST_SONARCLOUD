import { HttpStatus as StatusCodes } from '@nestjs/common';

import addUnhandledRejectionHandler from './addUnhandledRejectionHandler';
import checkIsBodyParserError from './checkIsBodyParserError';
import errorCodes from './errorCodes';
import errorMessages from './errorMessages';

enum ErrorTypeENUM {
  validation = 'validation',
  notAcceptable = 'notAcceptable',
  authorization = 'authorization',
  access = 'access',
  notFound = 'notFound',
  internal = 'internal',
}

const errorStatusCodes = {
  [ErrorTypeENUM.validation]: StatusCodes.BAD_REQUEST,
  [ErrorTypeENUM.authorization]: StatusCodes.UNAUTHORIZED,
  [ErrorTypeENUM.access]: StatusCodes.FORBIDDEN,
  [ErrorTypeENUM.notFound]: StatusCodes.NOT_FOUND,
  [ErrorTypeENUM.internal]: StatusCodes.INTERNAL_SERVER_ERROR,
  [ErrorTypeENUM.notAcceptable]: StatusCodes.NOT_ACCEPTABLE,
} as Record<ErrorTypeENUM, StatusCodes>;

type ErrorCodeType = keyof typeof errorMessages;

type ExceptionPayloadType<D> = {
  type: ErrorTypeENUM;
  statusCode: StatusCodes;
  code: ErrorCodeType;
  data: D;
};

export type ValidationErrorType = {
  path: 'params' | 'query' | 'body';
  key: string;
  code: ErrorCodeType;
};

class Exception<D> extends Error {
  static types = ErrorTypeENUM;

  static addUnhandledRejectionHandler = addUnhandledRejectionHandler;

  static checkIsBodyParserError = checkIsBodyParserError;

  static errorCodes = errorCodes;

  payload: ExceptionPayloadType<D> & { message: string };

  constructor(payload: ExceptionPayloadType<D>) {
    super('Custom error');

    this.payload = {
      ...payload,
      message: errorMessages[payload.code],
    };
  }

  static createException = <D>(
    payload: Omit<ExceptionPayloadType<D>, 'statusCode' | 'data'> & {
      data?: D;
    },
  ) => {
    const statusCode = this.getStatusCodeByType(payload.type);

    return new Exception({
      ...payload,
      statusCode,
      data: payload.data || null,
    });
  };

  static createValidationError = (errors: ValidationErrorType[] = []) => {
    return this.createException({
      type: ErrorTypeENUM.validation,
      data: errors.map((i) => ({ ...i, message: errorMessages[i.code] })),
      code: 'server.validation.failed',
    });
  };

  static createNotFoundError = <D>(payload?: D) => {
    return this.createException({
      code: errorCodes.server.notFound,
      type: ErrorTypeENUM.notFound,
      data: payload,
    });
  };

  static createAccessError = <D>(payload?: D) => {
    return this.createException({
      code: errorCodes.auth.accessDenied,
      type: ErrorTypeENUM.access,
      data: payload,
    });
  };

  static getStatusCodeByType = (type: ErrorTypeENUM) => {
    return errorStatusCodes[type];
  };
}

export default Exception;
