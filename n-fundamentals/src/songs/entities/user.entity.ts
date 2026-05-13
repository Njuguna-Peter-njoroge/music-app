import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Playlist } from './playlist.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  @Exclude() /* When working with TypeORM, there might be cases where you want to exclude one or multiple
columns (fields) from being selected. I don't want to send the password in the response that is why I
have added Exclude.*/
  password: string;

  @OneToMany(() => Playlist, (Playlist) => Playlist.user)
  Playlists: Playlist[];

  @Column({ nullable: true, type: 'text' })
  twoFASecret: string | null;

  @Column({ default: false, type: 'boolean' })
  enable2FA: boolean;
}
