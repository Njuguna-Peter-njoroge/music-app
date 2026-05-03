/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateSongDto } from './create-song.dto';
import { PartialType } from '@nestjs/mapped-types';
export class UpdateSongDto extends PartialType(CreateSongDto) {
  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly artists?: string[];

  @IsDateString()
  @IsOptional()
  readonly releasedDate?: string;

  @IsMilitaryTime()
  @IsOptional()
  readonly duration?: string;

  @IsString()
  @IsOptional()
  readonly lyrics?: string;
}
