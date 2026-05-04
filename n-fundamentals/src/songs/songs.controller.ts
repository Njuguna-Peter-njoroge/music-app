import { Pagination } from 'nestjs-typeorm-paginate';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Song } from './entities/create-song.entity';
import { SongsService } from './songs.service';

import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}
  @Post() create(@Body() createSongDto: CreateSongDto): Promise<Song> {
    return this.songsService.create(createSongDto);
  }
  // @Get() findAll(): Promise<Song[]> {
  //   try {
  //     return this.songsService.findAll();
  //   } catch (error) {
  //     throw new HttpException(
  //       'server error',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //       {
  //         cause: error,
  //       },
  //     );
  //   }
  // }
  @Get(':id') findOne(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
  ): Promise<Song> {
    return this.songsService.findOne(id);
  }

  @Put(':id') update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDto: UpdateSongDto,
  ): Promise<Song> {
    return this.songsService.update(id, updateSongDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.songsService.remove(id);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<Song>> {
    limit = limit > 100 ? 100 : limit;
    return this.songsService.paginate({
      page,
      limit,
    });
  }

  // THIS USES QUERYBUILDER

  //   @Get()
  //   findAll(
  //     @Query('page') page: number,
  //     @Query('limit') limit: number,
  //     @Query('sort') sort: string,
  //   ) {
  //     return this.songsService.findAll(page, limit, sort);
  //   }
}
