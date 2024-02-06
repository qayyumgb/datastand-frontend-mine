export enum LoadingStatus {
  Loading = 'loading',
  Loaded = 'loaded',
  Failed = 'failed',
}

export class LoadingStatusMixin {
  _loadingStatus: LoadingStatus = LoadingStatus.Loading;
  _error: any = null;

  constructor() {}

  get loadingStatus(): LoadingStatus {
    return this._loadingStatus;
  }

  set loadingStatus(state: LoadingStatus) {
    this._loadingStatus = state;
  }

  get error(): any {
    return this._error;
  }

  set error(err: any) {
    this._error = err;
  }

  isLoading(): boolean {
    return this.loadingStatus === LoadingStatus.Loading;
  }

  isLoaded(): boolean {
    return this.loadingStatus === LoadingStatus.Loaded;
  }

  startLoading() {
    this.loadingStatus = LoadingStatus.Loading;
  }

  stopLoading() {
    this.loadingStatus = LoadingStatus.Loaded;
  }

  failLoading(err: any) {
    this.loadingStatus = LoadingStatus.Failed;
    this.error = err;
  }
}
