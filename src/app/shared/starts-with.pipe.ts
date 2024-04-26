import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'startsWith',
  standalone: true
})
export class StartsWithPipe implements PipeTransform {
  transform(value: any, prefix: string): any {
    if (!value || !prefix) {
      return value;
    }

    const filteredObject: any = {};
    Object.keys(value).forEach(key => {
      if (key.startsWith(prefix) && value[key] !== null) {
        filteredObject[key] = value[key];
      }
    });

    return filteredObject;
  }
}
