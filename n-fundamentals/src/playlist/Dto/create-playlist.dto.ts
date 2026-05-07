import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createPlaylistDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly songs: number[];

  @IsNumber()
  @IsString()
  readonly user: string;
}
