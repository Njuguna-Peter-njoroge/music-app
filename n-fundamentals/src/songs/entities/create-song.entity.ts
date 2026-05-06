import { IsUUID } from 'class-validator';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from './artist.entity';

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
  @JoinTable({ name: 'Songs_artists' })
  artists: Artist[];
}