/* eslint-disable @typescript-eslint/no-unsafe-return */
import { CreateSongDto } from './dto/create-song.dto';
import { SongsService } from './songs.service';

import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}
  @Post() create(@Body() createSongDto: CreateSongDto) {
    const results = this.songsService.create(createSongDto);
    return results;
  }
  @Get() findAll() {
    try {
      return this.songsService.findAll();
    } catch (error) {
      throw new HttpException(
        'server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }
  @Get(':id') findOne(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
  ) {
    return `fetch song on the based on id ${typeof id}`;
  }

  //   @Put(':id') update() {
  //     return 'update song on the based on id';
  //   }
  //   @Delete(':id') delete() {
  //     return 'delete a song on the based on id';
  //   }
}
