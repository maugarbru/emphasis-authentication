import { IsNotEmpty, IsString } from 'class-validator';

export class IdentifyUsuarioDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
