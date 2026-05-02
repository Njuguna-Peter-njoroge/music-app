/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable no-irregular-whitespace */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './entities/create-song.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
  ) {}
  // local DB​
  // local array​
  private readonly songs: any[] = [];
  create(song) {
    // Save the song in ;;\the database​
    this.songs.push(song);
    return this.songs;
  }
  findAll() {
    // fetch the songs from the db​
    return this.songs;
  }
}
