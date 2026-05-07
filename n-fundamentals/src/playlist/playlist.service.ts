import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from '../songs/entities/playlist.entity';
import { In, Repository } from 'typeorm';
import { Song } from '../songs/entities/create-song.entity';
import { User } from '../songs/entities/user.entity';
import { createPlaylistDto } from './Dto/create-playlist.dto';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private playlistRepository: Repository<Playlist>,

    @InjectRepository(Song)
    private songsRepository: Repository<Song>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(playlistDto: createPlaylistDto): Promise<Playlist> {
    const playlist = new Playlist();
    playlist.name = playlistDto.name;

    const songs = await this.songsRepository.findBy({
      id: In(playlistDto.songs),
    });
    playlist.songs = songs;

    const user = await this.userRepository.findOneBy({ id: playlistDto.user });

    if (!user) {
      throw new NotFoundException('user not found');
    }
    playlist.user = user;

    return this.playlistRepository.save(playlist);
  }
}
