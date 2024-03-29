import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  username: string;

  @Column()
  email:string;

  @Column()
  password: string;

  @Column()
  order_hashkey: string;

  @Column()
  binance_api_key: string;
}
