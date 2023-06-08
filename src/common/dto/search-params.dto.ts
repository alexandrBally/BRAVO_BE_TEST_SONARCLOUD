import { IsRequiredNumber } from '../validation';

export class BaseSearchParamsDto {
  @IsRequiredNumber()
  public readonly offset: number;

  @IsRequiredNumber()
  public readonly limit: number;
}
