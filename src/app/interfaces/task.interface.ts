import { AuthoredModel, NamedModel, TaggableModel } from './abstract';

interface TaskStatsStatus {
  num_total: number;
  num_completed: number;
  num_in_progress: number;
  num_new: number;
  num_pending: number;
  num_rejected: number;
  ratio_completed: number;
}

export interface Task extends NamedModel, AuthoredModel, TaggableModel {
  langtag: string;
  image?: string;
  num_texts?: number;
  num_labels?: number;
  status: TaskStatsStatus;
}
