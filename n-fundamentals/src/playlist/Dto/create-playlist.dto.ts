import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class createPlaylistDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  readonly songs: string[];

  @IsString()
  @IsNotEmpty()
  readonly user: string;
}
