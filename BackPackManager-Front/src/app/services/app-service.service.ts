import { AppData } from './../models/app-data';
import { ISimpleItem, ICargoItem, CargoItem } from './../models/item';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { APP_DATA, APP_DEFAULTS } from './appData.json';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  cargosBS = new BehaviorSubject<ICargoItem[]>([]);

  constructor() {
    // let appData = APP_DATA;
    // localStorage.setItem('BackPackManagerData', JSON.stringify(appData));
    this.loadData();
  }

  saveData() {
    let appData: AppData = { cargos: this.cargosBS.value };
    localStorage.setItem('BackPackManagerData', JSON.stringify(appData));
  }

  loadData() {
    let data = localStorage.getItem('BackPackManagerData');
    if (data !== null && data?.length > 0) {
      let appData: AppData = JSON.parse(data);
      this.cargosBS.next(appData.cargos);
    } else {
      this.reInitData();
    }
  }

  reInitData() {
    this.cargosBS.next([{ name: APP_DEFAULTS.DEFAULT_CARGO_NAME, items: [] }]);
    this.saveData();
  }

  importItemsFromList(itemsList: string[]) {
    let importedItems: ISimpleItem[] = [];
    itemsList.forEach((name) =>
      importedItems.push({
        name: name,
      })
    );

    let allCargos = this.cargosBS.value;
    let looseItemsCargo = this.getDefaultCargo() ?? new CargoItem();
    let newLooseItems = [...looseItemsCargo?.items, ...importedItems];
    //todo handle with duplicates in all cargos
    looseItemsCargo.items = _.sortBy(_.uniqBy(newLooseItems, 'name'), 'name');
    this.cargosBS.next(allCargos);
  }

  moveItemToThrash(item: ISimpleItem) {
    this.cargosBS.value.forEach((c) => {
      _.remove(c.items, item);
    });
  }

  moveCargoToThrash(cargo: ICargoItem) {
    let cargoToRemove = this.cargosBS.value.find((c) => c.name === cargo.name);
    let defaultCargo = this.getDefaultCargo();
    let bb = _.concat(defaultCargo?.items, cargoToRemove?.items);

    let aa = _.remove(this.cargosBS.value, cargoToRemove);
  }

  getDefaultCargo() {
    return this.cargosBS.value.find(
      (c) => c.name === APP_DEFAULTS.DEFAULT_CARGO_NAME
    );
  }

  isCargoItemByName(name: string) {
    return name.startsWith('📦') && name.endsWith('📦');
  }
}
