import {
  IsString,
  IsEmail,
  IsStrongPassword,
  IsOptional,
} from "class-validator";

export class UserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;
}

export class CreateUserDto extends UserDto{
  @IsStrongPassword()
  password: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username?: string;
  
  @IsEmail()
  @IsOptional()
  email?: string;
}



