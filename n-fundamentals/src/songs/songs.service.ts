/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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

  // async create(songDto: CreateSongDto): Promise<Song> {
  //   const song = new Song();
  //   song.title = songDto.title;
  //   song.artists = songDto.artists;
  //   song.duration = songDto.duration;
  //   song.lyrics = songDto.lyrics;
  //   song.releasedDate = songDto.releasedDate;
  //   return await this.songRepository.save(song);
  // }

  // USING QUERYBUILDER
  async create(songDto: CreateSongDto): Promise<Song> {
    const result = await this.songRepository
      .createQueryBuilder()
      .insert()
      .into(Song)
      .values({
        title: songDto.title,
        artists: songDto.artists,
        duration: songDto.duration,
        lyrics: songDto.lyrics,
        releasedDate: songDto.releasedDate,
      })
      .returning('*')
      .execute();

    return result.raw[0] as Song;
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

  // async findOne(id: number): Promise<Song> {
  //   const song = await this.songRepository.findOneBy({ id });

  //   if (!song) {
  //     throw new NotFoundException(`song with id ${id} not found`);
  //   }
  //   return song;
  // }

  async findOne(id: number): Promise<Song> {
    const song = await this.songRepository
      .createQueryBuilder('song')
      .where('song.id = :id', { id })
      .getOne();
    if (!song) {
      throw new NotFoundException(`song with id ${id} not found`);
    }
    return song;
  }

  // async update(id: number, recordToUpdate: UpdateSongDto): Promise<Song> {
  //   return this.songRepository.save({
  //     id,
  //     ...recordToUpdate,
  //   });
  // }

  async update(id: number, recordToUpdate: UpdateSongDto): Promise<Song> {
    const result = await this.songRepository
      .createQueryBuilder()
      .update(Song)
      .set(recordToUpdate)
      .where('id =:id', { id })
      .execute();

    if (result.affected === 0) {
      throw new NotFoundException(`Song with id ${id} not found`);
    }

    const updatedSong = await this.songRepository.findOneBy({ id });
    if (!updatedSong) {
      throw new NotFoundException(`song with id ${id} not found`);
    }
    return updatedSong;
  }

  //   async remove(id: number): Promise<void> {
  //   await this.songRepository.delete(id);
  // }

  async remove(id: number): Promise<void> {
    await this.songRepository
      .createQueryBuilder()
      .delete()
      .from(Song)
      .where('id = :id', { id })
      .execute();
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    return paginate<Song>(this.songRepository, options);
  }
}
