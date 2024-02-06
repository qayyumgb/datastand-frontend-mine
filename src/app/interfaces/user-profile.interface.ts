import { User } from './user.interface';

export interface UserProfile {
  id: number;
  country?: string;
  image?: string;
  about?: string;
  headline?: string;
  pronouns?: string;
  custom_pronouns?: string;
  birthday?: Date;
  github?: string;
  linkedin?: string;
  website?: string;
  following?: User[];
  followers?: User[];
  num_followers?: number;
  num_following?: number;
  am_i_following?: boolean;
  user?: User;
  // Fields flattened from User
  username: string;
  first_name: string;
  last_name: string;
}
