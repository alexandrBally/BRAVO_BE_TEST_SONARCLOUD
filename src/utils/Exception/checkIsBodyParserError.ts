import type { ErrorRequestHandler } from 'express';
import { HttpStatus } from '@nestjs/common';

const checkIsBodyParserError = (err: Parameters<ErrorRequestHandler>[0]) => {
  return (
    err.statusCode === HttpStatus.BAD_REQUEST &&
    err.type === 'entity.parse.failed' &&
    err.name === 'SyntaxError'
  );
};

export default checkIsBodyParserError;
