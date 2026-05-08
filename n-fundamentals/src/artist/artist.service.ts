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
    const artist = await this.artistRepository.findOneBy({
      user: { id: userId },
    });
    if (!artist) {
      throw new NotFoundException('user not found');
    }
    return artist;
  }
}
