import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fixedNumber',
  standalone: true,
})
export class FixedNumberPipe implements PipeTransform {
  transform(value: number) {
    return value.toFixed(1);
  }
}
