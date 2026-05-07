import { Body, Controller, Post } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { createPlaylistDto } from './Dto/create-playlist.dto';
import { Playlist } from '../songs/entities/playlist.entity';

@Controller('playlist')
export class PlaylistController {
  constructor(private playlistService: PlaylistService) {}

  @Post()
  create(@Body() playlistDto: createPlaylistDto): Promise<Playlist> {
    return this.playlistService.create(playlistDto);
  }
}
