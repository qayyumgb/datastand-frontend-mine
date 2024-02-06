import { AuthoredModel } from './authored-model.interface';

// This maps directly to the Django model from datastand-backend.
export interface PublicModel extends AuthoredModel {
  is_public: boolean;
}
