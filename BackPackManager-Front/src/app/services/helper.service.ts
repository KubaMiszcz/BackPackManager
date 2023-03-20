import { Injectable } from '@angular/core';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}

  prepareNamesList(list: string[]) {
    list = this.trimAll(list);
    list = this.removeEmpties(list);
    list = this.removeDuplicates(list);
    return list;
  }

  removeDuplicates(list: string[]): string[] {
    return _.uniq(list);
  }
  removeEmpties(list: string[]): string[] {
    return list?.filter((i) => i?.length > 0);
  }

  trimAll(list: string[]): string[] {
    return list?.map((i) => i.trim());
  }
}
