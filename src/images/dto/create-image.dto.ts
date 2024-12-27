import { IsString } from 'class-validator';

export class DownloadImageDto {
  @IsString()
  base64: string;

  @IsString()
  filename: string;
}
