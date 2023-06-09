import { ISimpleItem } from 'src/app/models/item.model';
import { HelperService } from './helper.service';
import { ItemService } from 'src/app/services/item.service';
import { Injectable } from '@angular/core';
import { ICargoItem } from '../models/item.model';
import { BehaviorSubject } from 'rxjs';
import { AppService } from './app-service.service';
import { APP_DEFAULT_SETTINGS } from './appData.json';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class CargoService {
  
  constructor(
    private appService: AppService,
    private itemService: ItemService,
    private helperService: HelperService
  ) {}

  importCargosFromString(cargosInput: string) {
    let list = cargosInput.split('\n');
    list = this.helperService.prepareNamesList(list);

    list.forEach((name) => {
      if (this.appService.isNameUnique(name)) {
        this.addNewCargo(name);
      }
    });

    this.appService.refreshCargosBS();
  }

  private addNewCargo(name: string) {
    this.appService.cargosBS.value.push({
      name: name.toUpperCase(),
      items: [],
    });

    this.appService
      .getDefaultCargo()
      .items.push(this.itemService.createNewItem(name, true));
  }

  moveCargoToThrash(cargo: ICargoItem) {
    let defaultCargo = this.getDefaultCargo();
    if (cargo === defaultCargo) {
      alert('Cant remove default cargo');
      return;
    }

    defaultCargo.items = [...defaultCargo.items, ...cargo.items];
    _.remove(this.appService.cargosBS.value, cargo);
    this.appService.refreshCargosBS();
  }

  getDefaultCargo(): ICargoItem {
    return this.appService.getDefaultCargo();
  }

  // findCargoByName(name: string): ICargoItem {
  //  return this.appService.cargosBS.value.find((c) => c.name === name);
  // }

  
}
