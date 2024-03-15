import { BehaviorSubject, Observable, map } from 'rxjs';

export enum LoadingStatus {
  Loading = 'loading',
  Loaded = 'loaded',
  Failed = 'failed',
}

export class LoadingStatusMixin {
  private _loadingStatus: LoadingStatus = LoadingStatus.Loading;
  private _error: any = null;
  loadingStatus$ = new BehaviorSubject<LoadingStatus>(this._loadingStatus);

  constructor() {}

  get isLoading$(): Observable<boolean> {
    return this.loadingStatus$.pipe(
      map((status) => status === LoadingStatus.Loading)
    );
  }

  get isLoaded$(): Observable<boolean> {
    return this.loadingStatus$.pipe(
      map((status) => status === LoadingStatus.Loaded)
    );
  }

  private set loadingStatus(state: LoadingStatus) {
    this._loadingStatus = state;
    this.loadingStatus$.next(state);
  }

  get error(): any {
    return this._error;
  }

  set error(err: any) {
    this._error = err;
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
