/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable no-irregular-whitespace */
import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
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
