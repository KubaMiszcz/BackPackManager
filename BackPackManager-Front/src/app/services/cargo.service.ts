import { ISimpleItem } from 'src/app/models/item';
import { HelperService } from './helper.service';
import { ItemService } from 'src/app/services/item.service';
import { Injectable } from '@angular/core';
import { ICargoItem } from '../models/item';
import { BehaviorSubject } from 'rxjs';
import { AppService } from './app-service.service';
import { APP_DEFAULTS } from './appData.json';
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

  getNumberOfCargoItems(cargo: ICargoItem) {
    this.getItemsForCargo(cargo)?.length;
  }

  getItemsForCargo(cargo: ICargoItem) {
    return this.itemService.getItemsForCargo(cargo);
  }

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
    this.appService.cargosBS.value.push({ name: name.toUpperCase() });
  }

  moveCargoToThrash(cargo: ICargoItem) {
    let defaultCargo = this.getDefaultCargo();
    if (cargo === defaultCargo) {
      alert('Cant remove default cargo');
      return;
    }

    let items = this.getItemsForCargo(cargo);
    items.forEach((i) => (i.parentCargo = defaultCargo));

    _.remove(this.appService.cargosBS.value, cargo);
    this.appService.refreshCargosBS();
  }

  getDefaultCargo(): ICargoItem {
    return this.appService.getDefaultCargo();
  }

  findCargoByName(name: string): ICargoItem {
   return this.appService.cargosBS.value.find((c) => c.name === name);
  }

  
}
