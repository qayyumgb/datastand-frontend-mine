import { User } from './user.interface';

export interface Follower {
  user: User;
  id: number;
  created: Date;
}
