// This maps directly to the Django model from datastand-backend.
export interface ForkableModel {
  forked_from?: string;
  num_forks?: number;
}
