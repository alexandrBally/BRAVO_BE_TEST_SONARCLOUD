import { applyDecorators, Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

export function BaseController(path: string, description: string) {
  const decorators = [
    ApiBearerAuth(),
    ApiTags(`[/${path}] - ${description}`),
    Controller(`/${path}`),
  ];

  return applyDecorators(...decorators);
}

export function PublicController(path: string, description: string) {
  const decorators = [
    ApiTags(`[/${path}] - ${description}`),
    Controller(`/${path}`),
  ];

  return applyDecorators(...decorators);
}
