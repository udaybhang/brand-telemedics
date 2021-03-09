import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(val: any, keys: string, term: string) {
    var value:any = val._data._value;
    console.log(value);
    if (!term) {
      return value;
    }
    console.log(value, keys, term)
    return (value._data.value || []).filter((item: any) => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])));
  }

}