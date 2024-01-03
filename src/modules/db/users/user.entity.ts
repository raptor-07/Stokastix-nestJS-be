import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  username: string;

  @Column()
  password: string;

  @Column()
  order_hashkey: string;
}
