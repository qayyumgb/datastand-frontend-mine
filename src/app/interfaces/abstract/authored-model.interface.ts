import { User } from '../user.interface';

// This maps directly to the Django model from datastand-backend.
export interface AuthoredModel {
  id: number;
  klass?: string;
  creator?: User;
  created?: Date;
  modified?: Date;
}
