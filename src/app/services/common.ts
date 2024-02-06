import { HttpParams } from '@angular/common/http';
import * as dayjs from 'dayjs';

export interface BaseFilters {
  // Filters which map directly to the API
  creator?: string;
  is_public?: boolean | string;
  limit?: number | string;
  ordering?: string;
  search?: string;
  tag?: string;
  // Aditional filters
  page?: number | string;
  modifiedLast?: number | string; // number of days;
}

/** Remove undefined and null values from a filters object.
 * @param params Object to be cleaned
 * @returns void
 */
export function clearFilters(params: any): void {
  Object.keys(params).forEach((key) => {
    if (
      params[key as keyof typeof params] == undefined ||
      params[key as keyof typeof params] == null ||
      params[key as keyof typeof params] == ''
    ) {
      delete params[key as keyof typeof params];
    }
  });
}

export function fileToFormData(file: File): FormData {
  let formData = new FormData();
  formData.append('file', file);
  return formData;
}

/** Get the date of the last modified texts.
 * @param days Number of days to substract from today
 * @returns Date in YYYY-MM-DD format
 */
export function getModifiedLastDate(days: number) {
  return dayjs().subtract(days, 'day').format('YYYY-MM-DD');
}

export function imageToFormData(image: File): FormData {
  let formData = new FormData();
  formData.append('image', image);
  return formData;
}

export function resolveBaseFiltersToParams(
  filters: BaseFilters,
  pageSize: number = 20
): HttpParams {
  let params = new HttpParams({ fromObject: { ...filters } });
  // page -> offset
  if (filters.page) {
    let offset: number = (Number(filters.page) - 1) * pageSize;
    params = params.append('offset', offset);
  }
  // modifiedLast -> modified__gte
  if (filters.modifiedLast) {
    params = params.append(
      'modified__gte',
      getModifiedLastDate(Number(filters.modifiedLast))
    );
  }
  return params;
}
