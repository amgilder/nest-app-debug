import { User } from "../user.entity";

export class UserDTO {
  id: number;
  name: string;
  handle: string;
  image: string | null;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.handle = user.handle;
    this.image = user.image;
  }
}