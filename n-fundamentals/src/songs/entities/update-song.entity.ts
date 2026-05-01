/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsOptional, IsString } from 'class-validator';
export class updateSongDto {
  @IsString()
  @IsOptional()
  readonly lyrics: string;
}
