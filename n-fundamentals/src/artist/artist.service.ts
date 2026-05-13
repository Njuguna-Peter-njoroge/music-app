import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from '../songs/entities/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async findArtist(userId: string): Promise<Artist> {
    console.log('Incoming userId:', userId);

    const artist = await this.artistRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['user'],
    });
    console.log(artist);
    if (!artist) {
      throw new NotFoundException('user ff not found');
    }
    return artist;
  }
}
