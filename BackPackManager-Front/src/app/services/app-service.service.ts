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

    if (cargoToRemove === defaultCargo) {
      alert('Cant remove default cargo');
      return;
    }

    defaultCargo.items = defaultCargo?.items.concat(cargoToRemove?.items ?? []);
    _.remove(this.cargosBS.value, cargoToRemove);
    this.moveItemToThrashByName(cargo.name);
    this.cargosBS.next(this.cargosBS.value);
  }

  moveItemToThrashByName(name: string) {
    this.cargosBS.value.forEach((c) => {
      _.remove(c.items, (item) => item.name === '📦' + name + '📦');
    });
  }

  findItem(name: string): ISimpleItem {
    let item: ISimpleItem;
    this.cargosBS.value.forEach((c) => {
      let found = c.items.find((i) => i.name === name);
      if (found) {
        item = found;
        return;
      }
    });

    return item;
  }

  getDefaultCargo(): ICargoItem {
    return (
      this.cargosBS.value.find(
        (c) => c.name === APP_DEFAULTS.DEFAULT_CARGO_NAME
      ) ?? {
        name: APP_DEFAULTS.DEFAULT_CARGO_NAME,
        items: [],
      }
    );
  }

  isCargoItemByName(name: string) {
    return name.startsWith('📦') && name.endsWith('📦');
  }

  getAllItems(): ISimpleItem[] {
    let list: ISimpleItem[] = [];
    this.cargosBS.value.forEach((c) => (list = list.concat([...c.items])));

    return list;
  }
}
