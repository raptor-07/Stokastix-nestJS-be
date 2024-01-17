import { IsNotEmpty, IsString } from 'class-validator';

export class updateDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  order_hashkey: string;

  @IsNotEmpty()
  @IsString()
  binance_api_key: string;
}
