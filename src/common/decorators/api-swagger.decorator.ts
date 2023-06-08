import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export interface ApiSwaggerData {
  summary: string;
  status?: HttpStatus;
  type?: any;
}

export function ApiSwaggerData(data: ApiSwaggerData) {
  const { summary, status, type } = data;

  const response = {
    status,
    type,
  };

  const decorators = [
    ApiOperation({
      summary,
    }),
    ApiResponse({
      ...response,
    }),
  ];

  return applyDecorators(...decorators);
}
