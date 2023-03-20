import { ICargoItem, SimpleItem } from './../models/item';
import { AppService } from 'src/app/services/app-service.service';
import { HelperService } from './helper.service';
import { Injectable } from '@angular/core';
import { ISimpleItem } from '../models/item';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(
    private helperService: HelperService,
    private appService: AppService
  ) {}
  
  
  getItemsForCargo(cargo: ICargoItem) {
    return (
      this.appService.itemsBS.value?.filter((i) => i.parentCargo === cargo) ??
      []
    );
  }

  importItemsFromString(itemsInput: string) {
    let list = itemsInput.split('\n');
    list = this.helperService.prepareNamesList(list);
    let allItems = this.appService.itemsBS.value;

    list.forEach((name) => {
      if (!allItems.some((i) => i.name === name)) {
        allItems.push({ name: name });
      }
    });

    this.appService.refreshItemsBS();
  }

  togglePinItem(item: ISimpleItem) {
    item.isPinned = !item.isPinned;
  }

  // getSortedItems(cargoItems: ISimpleItem[]): ISimpleItem[] {
  //   let cargos = _.sortBy(
  //     cargoItems.filter((i) => this.isCargoItemByName(i.name)),
  //     'name'
  //   );
  //   let items = _.sortBy(
  //     cargoItems.filter((i) => !this.isCargoItemByName(i.name)),
  //     'name'
  //   );

  //   return [...cargos, ...items];
  // }
}
