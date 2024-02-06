export interface BaseListApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
}

export interface NumChangedResponse {
  num_changed: number;
}

export interface NumCreatedResponse {
  num_created: number;
}

export interface NumDeletedResponse {
  num_deleted: number;
}
