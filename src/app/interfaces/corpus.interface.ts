import {
  ForkableModel,
  NamedModel,
  PublicModel,
  TaggableModel,
  VoteModel,
} from './abstract';
import { Text } from './text.interface';

export interface Corpus
  extends ForkableModel,
    NamedModel,
    PublicModel,
    TaggableModel,
    VoteModel {
  texts?: Text[];
  langtag: string;
  image?: string;
  tags?: string[];
  num_texts?: number;
}
