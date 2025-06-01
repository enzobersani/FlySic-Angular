import { Pipe, PipeTransform } from '@angular/core';
import { SelectItemModel } from '../models/select-item.model';

@Pipe({
  name: 'selectSearch',
  standalone: true
})
export class SelectSearchPipe implements PipeTransform {

  transform(value: SelectItemModel[], search: string): SelectItemModel[] {
    return value.length <= 0 ? [] : value.filter(v => v.description.toLowerCase().includes(search.toLowerCase()) || v.key.toString().toLowerCase().includes(search.toLowerCase()));
  }

}
