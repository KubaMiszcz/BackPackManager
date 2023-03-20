import { CargoService } from './cargo.service';
import { ICargoItem, SimpleItem } from '../models/item.model';
import { AppService } from 'src/app/services/app-service.service';
import { HelperService } from './helper.service';
import { Injectable } from '@angular/core';
import { ISimpleItem } from '../models/item.model';
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

    this.appService.refreshCargosBS();
  }

  addNewItem(
    name: string,
    destinationCargo: ICargoItem = null,
    isCargo: boolean = null
  ) {
    if (!destinationCargo) {
      destinationCargo = this.appService.getDefaultCargo();
    }

    destinationCargo.items.push({
      name: !!isCargo ? name.toUpperCase() : name,
      isCargo: isCargo,
    });
  }

  moveItemToThrash(item: ISimpleItem) {
    let cargo = this.findParentCargo(item);
    _.remove(cargo.items, item);
    this.appService.refreshCargosBS();
  }

  findParentCargo(item: ISimpleItem) {
    return this.appService.cargosBS.value.find((c) =>
      c.items.some((i) => i.name === item.name)
    );
  }

  togglePinItem(item: ISimpleItem) {
    item.isPinned = !item.isPinned;
  }

  getAllItems(): ISimpleItem[] {
    let itemsList: ISimpleItem[] = [];
    this.appService.cargosBS.value.forEach(
      (c) => (itemsList = [...itemsList, ...c.items])
    );
    return itemsList;
  }
}
