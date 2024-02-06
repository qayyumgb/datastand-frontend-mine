import {
  ForkableModel,
  NamedModel,
  PublicModel,
  TaggableModel,
  VoteModel,
} from './abstract';

export interface LabelSet
  extends ForkableModel,
    NamedModel,
    PublicModel,
    TaggableModel,
    VoteModel {
  author?: string;
  num_labels?: number;
  image?: string;
}
