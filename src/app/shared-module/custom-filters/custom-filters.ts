import { Pipe, PipeTransform } from "@angular/core";
import * as _ from "lodash";
@Pipe({
  name: "searchFilter",
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], field: string, value: string): any {
    return items.filter((x) => x[field] == value);
  }
}
