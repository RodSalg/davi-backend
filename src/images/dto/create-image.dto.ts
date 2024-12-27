import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class DownloadImageDto {
  @IsString()
  base64: string;

  @IsString()
  filename: string;
}

export class HistoricProductsDto {
  @IsDate()
  @IsNotEmpty()
  data: Date;

  @IsString()
  @IsNotEmpty()
  product: string;

  @IsString()
  @IsNotEmpty()
  inspectionID: string;

  @IsBoolean()
  @IsNotEmpty()
  result: boolean;

  @IsString()
  @IsNotEmpty()
  failMessage: string;
}

export class cardsDashboardDTO {
  @IsString()
  @IsNotEmpty()
  currentState: string;

  @IsString()
  @IsNotEmpty()
  inspectionsToday: number;

  @IsNumber()
  @IsNotEmpty()
  totalTimeToday: number; //retornar tudo em segundos

  @IsBoolean()
  @IsNotEmpty()
  totalFailsToday: number;
}
