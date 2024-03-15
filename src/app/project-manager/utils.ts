import { Observable, concat, merge, retry } from 'rxjs';

import { Entity } from '@app/interfaces';

/**
 * Checks if the given username matches the creator's username of the entity.
 * @param entity - The entity to check.
 * @param username - The username to compare with the creator's username.
 * @returns Returns true if the username matches the creator's username, otherwise false.
 */
export function isCreator(entity: Entity, username: string) {
  return entity.creator?.username === username;
}

/**
 * Runs multiple HTTP calls in parallel and returns an Observable that emits the results.
 *
 * @template T The type of the response data.
 * @param numCalls The number of HTTP calls to make.
 * @param httpCallFn The function that makes the HTTP call.
 * @returns An Observable that emits the results of the HTTP calls.
 */
export function runParallelHttpCalls<T>(
  numCalls: number,
  httpCallFn: () => Observable<T>
): Observable<T> {
  const subscriptions: Observable<T>[] = [];

  for (let i = 0; i < numCalls; i++) {
    subscriptions.push(httpCallFn());
  }

  return merge(...subscriptions);
}

/**
 * Runs parallel HTTP calls in chunks.
 *
 * @template T - The type of the response from the HTTP call.
 * @param numCalls - The total number of HTTP calls to be made.
 * @param chunkSize - The number of HTTP calls to be made in each chunk.
 * @param httpCallFn - The function that makes the HTTP call.
 * @returns An Observable that emits the response from the HTTP calls.
 */
export function runParallelHttpCallsInChunks<T>(
  numCalls: number,
  httpCallFn: () => Observable<T>,
  chunkSize: number = 10
): Observable<T> {
  const numChunks = Math.ceil(numCalls / chunkSize);
  const subscriptions: Observable<T>[] = [];

  for (let i = 0; i < numChunks; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, numCalls);
    const chunkSubscriptions: Observable<T>[] = [];

    for (let j = start; j < end; j++) {
      chunkSubscriptions.push(httpCallFn().pipe(retry(5))); // Retry up to 5 times
    }
    subscriptions.push(merge(...chunkSubscriptions));
  }

  // Use concat to wait for the previous chunk to complete before starting the next one.
  return concat(...subscriptions);
}

export function truncate(str: string, maxlength: number = 64) {
  return str.length > maxlength ? str.slice(0, maxlength - 1) + '…' : str;
}
