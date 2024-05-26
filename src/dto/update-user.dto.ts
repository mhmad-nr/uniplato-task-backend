import { IsString, IsEmail, IsOptional, IsNumber } from "class-validator";

export class UpdateUserDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  @IsOptional()
  username?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}
