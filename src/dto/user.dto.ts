import {
  IsString,
  IsEmail,
} from "class-validator";

export class UserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;
}
