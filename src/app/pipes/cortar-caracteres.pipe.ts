import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'cortarCaracteres'})
export class cortarCaracteresthPipe implements PipeTransform {
  transform(value: string, chars = 25): string {
    if(value.length>chars)
      return value.slice(0, chars)+"...";    
    return value.slice(0, chars);    
  }
}