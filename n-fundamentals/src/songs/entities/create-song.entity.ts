import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('songs')
export class createSongDto {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  title:string;

  @Column("varchar" , {array: true})
  artists:string[]

  @Column({type :'date'})
  relasedData : Date;

  @Column({type : 'time'})
  duration: Date;

  @Column({type: 'text'})
  lyrics : string;
}
