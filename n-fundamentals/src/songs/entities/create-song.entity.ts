import { IsUUID } from 'class-validator';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from './artist.entity';
import { Playlist } from './playlist.entity';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column()
  title: string;

  // @Column('varchar', { array: true })
  // artists: string[];

  @Column({ type: 'date' })
  releasedDate: string;

  @Column({ type: 'time' })

  duration: string;

  
  @Column({ type: 'text' })
  lyrics: string;

  @ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true })
  @JoinTable({ name: 'songs_artists' })
  artists: Artist[];

  @ManyToOne(() => Playlist, (playList) => playList.songs)
  playList: Playlist;
}
