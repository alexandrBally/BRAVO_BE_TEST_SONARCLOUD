import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsBoolean,
  ArrayMinSize,
  IsArray,
  MaxLength,
  Min,
  Max,
  IsDecimal,
} from 'class-validator';
import { applyDecorators } from '@nestjs/common';

const optionalBooleanMapper = new Map([
  ['undefined', undefined],
  ['true', true],
  ['false', false],
]);

export function IsRequiredString(maxLength?: number) {
  const decorators = [ApiProperty(), IsString(), IsNotEmpty()];

  if (maxLength) {
    decorators.push(MaxLength(maxLength));
  }

  return applyDecorators(...decorators);
}

export function IsOptionalString(maxLength?: number) {
  const decorators = [
    ApiProperty({ required: false }),
    IsString(),
    IsOptional(),
    IsNotEmpty(),
  ];

  if (maxLength) {
    decorators.push(MaxLength(maxLength));
  }

  return applyDecorators(...decorators);
}

export function IsRequiredNumber(maxNumber?: number) {
  const decorators = [
    ApiProperty(),
    IsInt(),
    Min(0),
    IsNotEmpty(),
    Type(() => Number),
  ];

  if (maxNumber) {
    decorators.push(Max(maxNumber));
  }

  return applyDecorators(...decorators);
}

export function IsRequiredFloatNumber(maxNumber?: number) {
  const decorators = [ApiProperty(), IsDecimal(), IsNotEmpty()];

  if (maxNumber) {
    decorators.push(Max(maxNumber));
  }

  return applyDecorators(...decorators);
}

export function IsOptionalNumber(maxNumber?: number) {
  const decorators = [
    ApiProperty({ required: false }),
    IsInt(),
    Min(0),
    IsNotEmpty(),
    IsOptional(),
    Type(() => Number),
  ];

  if (maxNumber) {
    decorators.push(Max(maxNumber));
  }

  return applyDecorators(...decorators);
}

export function IsRequiredBoolean() {
  const decorators = [
    ApiProperty({ required: false }),
    IsBoolean(),
    IsNotEmpty(),
  ];

  return applyDecorators(...decorators);
}

export function IsRequiredArray() {
  const decorators = [IsArray(), ArrayMinSize(0), IsNotEmpty()];

  return applyDecorators(...decorators);
}

export const QueryBooleanDecorataor = () =>
  Transform(({ value }) => optionalBooleanMapper.get(value));

export const BooleanDecorataorCheck = () => Transform(({ value }) => !!value);

export function QueryBoolean() {
  const decorators = [
    ApiProperty({ required: false }),
    QueryBooleanDecorataor(),
    IsNotEmpty(),
  ];

  return applyDecorators(...decorators);
}

export function IsOptionalBoolean() {
  const decorators = [
    ApiProperty({ required: false }),
    BooleanDecorataorCheck(),
    IsBoolean(),
    IsNotEmpty(),
    IsOptional(),
    Type(() => Boolean),
  ];

  return applyDecorators(...decorators);
}
