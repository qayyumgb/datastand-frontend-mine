export enum StatusEnum {
  NEW = 'new',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
  REVIEWED = 'reviewed',
  PENDING = 'pending',
  REJECTED = 'rejected',
  ABANDONED = 'abandoned',
}

export interface StatusModel {
  status?: StatusEnum;
}
