import { IsStrongPassword } from "class-validator";
import {UserDto} from "./user.dto"
export class CreateUserDto extends UserDto {
  
  @IsStrongPassword()
  password: string;
}
