import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Song } from './create-song.entity';
import { User } from './user.entity';

@Entity('playlists')
export class Playlist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // each playlist will have multiple songs

  @OneToMany(() => Song, (song) => song.artists)
  songs: Song[];

  //may playlist can belong to a single unique user

  @ManyToOne(() => User, (user) => user.Playlists)
  user: User;
}
