import { Pipe, PipeTransform } from '@angular/core';

import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

@Pipe({
  name: 'toNow',
})
export class ToNowPipe implements PipeTransform {
  transform(value: Date, ...args: unknown[]): unknown {
    return dayjs(value).toNow();
  }
}
