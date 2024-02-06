import { User } from '../user.interface';

// This maps directly to the Django model from datastand-backend.
export interface VoteModel {
  upvoted_by?: User[];
  num_upvotes?: number;
  has_upvoted?: boolean;
}
