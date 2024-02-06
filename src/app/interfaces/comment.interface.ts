import { AuthoredModel } from './abstract';

export interface Comment extends AuthoredModel {
  text: string;
  content_type: string;
  object_id: number;
}
