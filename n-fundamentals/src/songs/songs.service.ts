/* eslint-disable no-irregular-whitespace */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './entities/create-song.entity';
import { Repository } from 'typeorm';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
  ) {}

  async create(songDto: CreateSongDto): Promise<Song> {
    const song = new Song();
    song.title = songDto.title;
    song.artists = songDto.artists;
    song.duration = songDto.duration;
    song.lyrics = songDto.lyrics;
    song.releasedDate = songDto.releasedDate;
    return await this.songRepository.save(song);
  }

  findAll(): Promise<Song[]> {
    // fetch the songs from the db​
    return this.songRepository.find();
  }

  //   findAll(page = 1, limit = 10, sort = 'title'): Promise<Song[]> {
  //   return this.songRepository
  //     .createQueryBuilder('song')
  //     .orderBy(`song.${sort}`, 'ASC')
  //     .skip((page - 1) * limit)
  //     .take(limit)
  //     .getMany();
  // }

  async findOne(id: number): Promise<Song> {
    const song = await this.songRepository.findOneBy({ id });

    if (!song) {
      throw new NotFoundException(`song with id ${id} not found`);
    }
    return song;
  }

  async remove(id: number): Promise<void> {
    await this.songRepository.delete(id);
  }

  async update(id: number, recordToUpdate: UpdateSongDto): Promise<Song> {
    return this.songRepository.save({
      id,
      ...recordToUpdate,
    });
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    return paginate<Song>(this.songRepository, options);
  }
}
