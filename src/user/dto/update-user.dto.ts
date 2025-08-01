import { IsNotEmpty, MaxLength, MinLength, minLength } from "class-validator";

export class UpdateUser {
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  @MinLength(3)
  @MaxLength(128)
  name: string;
  
  image: string;
}