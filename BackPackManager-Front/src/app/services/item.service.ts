import { CargoService } from './cargo.service';
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

  getItemsForCargo(cargo: ICargoItem): ISimpleItem[] {
    return (
      this.appService.itemsBS.value?.filter((i) => i.parentCargo === cargo) ??
      []
    );
  }

  importItemsFromString(
    itemsInput: string,
    destinationCargo: ICargoItem = null
  ) {
    let list = itemsInput.split('\n');
    list = this.helperService.prepareNamesList(list);

    list.forEach((name) => {
      if (this.appService.isNameUnique(name)) {
        this.addNewItem(name, destinationCargo);
      }
    });

    this.appService.refreshItemsBS();
  }

  addNewItem(name: string, destinationCargo: ICargoItem = null) {
    if (!destinationCargo) {
      destinationCargo = this.appService.getDefaultCargo();
    }

    this.appService.itemsBS.value.push({
      name: name,
      parentCargo: destinationCargo,
    });
  }

  moveItemToThrash(item: ISimpleItem) {
    _.remove(this.appService.itemsBS.value, item);
    this.appService.refreshItemsBS();
  }

  togglePinItem(item: ISimpleItem) {
    item.isPinned = !item.isPinned;
  }
}
