import { User } from "../user/user.entity";
import { Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({ name: 'tokens' })
export class Token {
  @PrimaryColumn()
  token: string;

  // One user may have multiple tokens
  @ManyToOne(() => User, (user) => user.tokens)
  user: User;
}