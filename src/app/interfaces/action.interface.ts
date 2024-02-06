import { Corpus } from './corpus.interface';
import { LabelSet } from './label-set.interface';
import { User } from './user.interface';

export interface Action {
  id: number;
  verb: string;
  public: boolean;
  timestamp: Date;
  actor: User;
  target: LabelSet | Corpus;
}
