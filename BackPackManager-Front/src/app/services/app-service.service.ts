import { AppData } from './../models/app-data';
import { ISimpleItem, ICargoItem, CargoItem } from './../models/item';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { APP_DATA } from './appData.json';
import * as _ from "lodash";


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
    itemsList.forEach((i) =>
      importedItems.push({
        name: i,
      })
    );

    let allCargos = this.cargosBS.value;
    let looseItemsCargo =
      allCargos.find((c) => c.name === APP_DEFAULTS.DEFAULT_CARGO_NAME) ??
      new CargoItem();
    let newLooseItems = [...looseItemsCargo?.items, ...importedItems];
    //todo handle with duplicates in all cargos
    looseItemsCargo.items = _.sortBy(_.uniqBy(newLooseItems, 'name'), 'name');
    this.cargosBS.next(allCargos);
  }
}

export const APP_DEFAULTS = {
  DEFAULT_CARGO_NAME: '!Loose Items',
};
