import { AuthoredModel } from './authored-model.interface';
import { NamedModel } from './named-model.interface';
import { StatusModel } from './status-model.interface';
import { TaggableModel } from './taggable-model.interface';

export interface AbstractLabel
  extends AuthoredModel,
    NamedModel,
    StatusModel,
    TaggableModel {
  object_id: number;
  content_type?: 'labelset' | 'task';
  value: string;
  color?: string;
  author?: string;
  examples?: string[];
  is_pending?: boolean;
}
