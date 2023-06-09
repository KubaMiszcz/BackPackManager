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
    itemsInput: string[],
    destinationCargoName: string = null
  ) {
    let itemsList = this.helperService.prepareNamesList(itemsInput);

    let destinationCargo = this.getDestinationCargo(destinationCargoName);

    if (!destinationCargo) {
      return;
    }

    itemsList.forEach((name) => {
      if (this.appService.isNameUnique(name)) {
        destinationCargo.items.push(this.createNewItem(name));
        return;
      } else {
        let cargo = this.findParentCargoByItemName(name);
        if (cargo !== destinationCargo) {
          this.transferItemsBetweenCargos(cargo, destinationCargo, name);
        }
      }
    });

    this.appService.refreshCargosBS();
  }

  transferItemsBetweenCargos(
    sourceCargo: ICargoItem,
    destinationCargo: ICargoItem,
    itemName: string
  ) {
    let item = _.find(sourceCargo.items, { name: itemName });
    _.remove(sourceCargo.items, item);
    destinationCargo.items.push(item);
  }

  getDestinationCargo(destinationCargoName: string): ICargoItem {
    if (!destinationCargoName) {
      return this.appService.getDefaultCargo();
    }

    return this.appService.findCargoByName(destinationCargoName);
  }

  createNewItem(name: string, isCargo: boolean = null): ISimpleItem {
    return {
      name: !!isCargo ? name.toUpperCase() : name,
      isCargo: isCargo,
    };
  }

  moveItemToThrash(item: ISimpleItem) {
    let cargo = this.findParentCargo(item);
    _.remove(cargo.items, item);
    this.appService.refreshCargosBS();
  }

  findParentCargo(item: ISimpleItem) {
    return this.findParentCargoByItemName(item.name);
  }

  findParentCargoByItemName(name: string) {
    return this.appService.cargosBS.value.find((c) =>
      c.items.some((i) => i.name === name)
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

  getSortedItems(itemsList: ISimpleItem[]): ISimpleItem[] {
    return _.sortBy(_.sortBy(itemsList, 'name'), 'isCargo');
  }
}
