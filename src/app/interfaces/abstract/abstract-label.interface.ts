import { AuthoredModel } from './authored-model.interface';
import { NamedModel } from './named-model.interface';
import { StatusModel } from './status-model.interface';
import { TaggableModel } from './taggable-model.interface';

export type LabelContentType = 'labelset' | 'task';

export interface AbstractLabel
  extends AuthoredModel,
    NamedModel,
    StatusModel,
    TaggableModel {
  object_id: number;
  content_type?: LabelContentType;
  value: string;
  color?: string;
  author?: string;
  examples?: string[];
  is_pending?: boolean;
}
