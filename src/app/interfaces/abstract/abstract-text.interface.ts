import { AuthoredModel } from './authored-model.interface';
import { StatusModel } from './status-model.interface';
import { TaggableModel } from './taggable-model.interface';
export interface AbstractText
  extends AuthoredModel,
    StatusModel,
    TaggableModel {
  content_type?: 'task' | 'corpus';
  object_id?: number;
  name: string;
  description?: string;
  raw_string: string;
  langtag: string;
  author?: string;
  image?: string;
  is_generated?: boolean;
  is_pending?: boolean;
  is_seed?: boolean;
}
