import { Point } from '@angular/cdk/drag-drop';
import { AppData } from '../models/app-data.model';
import {Clipboard} from '@angular/cdk/clipboard';
import {
  ISimpleItem,
  ICargoItem,
  CargoItem,
  PointXY,
} from '../models/item.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DEFAULT_APP_DATA, APP_DEFAULT_SETTINGS } from './appData.json';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  cargosBS = new BehaviorSubject<ICargoItem[]>([]);
  isEditionsEnabledBS = new BehaviorSubject<boolean>(false);

  constructor(private clipboard: Clipboard) {
    // let appData = APP_DATA;
    // localStorage.setItem('BackPackManagerData', JSON.stringify(appData));
    this.loadData();
  }

  saveData() {
    let appData: AppData = { cargos: this.cargosBS.value };
    localStorage.setItem(
      APP_DEFAULT_SETTINGS.BACKPACKMANAGER_APPDATA,
      JSON.stringify(appData)
    );
  }

  loadData() {
    let appData = this.getAppDataFromLocalStorage();

    if (appData) {
      this.refreshCargosBS(appData);
    } else {
      this.reInitData();
      // this.loadDefaultData();
    }
  }

  loadDefaultData() {
    let appData = DEFAULT_APP_DATA;
    this.refreshCargosBS(appData);
  }

  private getAppDataFromLocalStorage() {
    let data = localStorage.getItem(APP_DEFAULT_SETTINGS.BACKPACKMANAGER_APPDATA);

    if (data !== null && data?.length > 0) {
      let appData: AppData = JSON.parse(data);
      return appData;
    }

    return null;
  }

  reInitData() {
    this.cargosBS.next([{ name: APP_DEFAULT_SETTINGS.DEFAULT_CARGO_NAME, items: [] }]);
    this.saveData();
  }

  refreshCargosBS(value?: AppData) {
    this.cargosBS.next(value?.cargos ?? this.cargosBS.value);
  }

  getAllNames() {
    let allNames: string[] = [];
    this.cargosBS.value.forEach((c) => {
      allNames.push(c.name);
      c.items.forEach((i) => allNames.push(i.name));
    });

    return allNames;
  }

  isNameUnique(name: string) {
    return !this.getAllNames().some(
      (n) => n.toLowerCase() === name.toLowerCase()
    );
  }

  getDefaultCargo(): ICargoItem {
    return (
      this.cargosBS.value.find(
        (c) => c.name === APP_DEFAULT_SETTINGS.DEFAULT_CARGO_NAME
      ) ?? {
        name: APP_DEFAULT_SETTINGS.DEFAULT_CARGO_NAME,
        items: [],
      }
    );
  }

  resetPositions() {
    let appData = this.getAppDataFromLocalStorage();
    appData?.cargos.forEach((c) => (c.dragPosition = new PointXY()));
    console.log('ss');

    this.refreshCargosBS(appData);
  }

  savePositions() {
    throw new Error('Method not implemented.');
    // let appData = this.getAppDataFromLocalStorage();
    // appData?.cargos.forEach((c) => (c.dragPosition = new PointXY()));
    // console.log('ss');

    // this.updateForViews(appData?.cargos);
  }

  toggleEditions() {
    this.isEditionsEnabledBS.next(!this.isEditionsEnabledBS.value);
  }

  findCargoByName(cargoName: string): ICargoItem {
    return this.cargosBS.value.find(
      (c) => c.name.toLowerCase() === cargoName.toLowerCase()
    );
  }

  exportToClipboard() {
    let list = '';
    this.cargosBS.value.forEach((c) => {
      list += '>' + c.name.toUpperCase() + '\n';
      c.items.forEach((i) => (list += i.name + '\n'));
      list += '\n';
    });

    this.clipboard.copy(list);
  }

  searchForItem(value: string) {
    const minSearchLength = APP_DEFAULT_SETTINGS.MIN_SEARCH_TEXT_LENGTH;
    this.cargosBS.value.forEach(
      (c) =>
        c.items.forEach(
          (i) =>
            (i.isHighlighted =
              value.length >= minSearchLength
                ? i.name.toLowerCase().includes(value.toLowerCase())
                : false)
        )
      // .forEach((item) => (item.isHighlighted = isHighlighted))
    );
  }

  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////

  // importItemsFromList(itemsNamesList: string[], fromCargo?: boolean) {
  //   console.log('s');

  //   let destinationCargo: ICargoItem;
  //   if (fromCargo) {
  //     let cargoName = itemsNamesList[0];
  //     itemsNamesList.shift();
  //     let cargo = this.cargosBS.value.find((c) => c.name === cargoName);
  //     if (cargo) {
  //       destinationCargo = cargo;
  //     } else {
  //       this.importCargos([cargoName]);
  //       destinationCargo = this.findCargoByName(cargoName);
  //     }
  //   } else {
  //     // destinationCargo = this.getDefaultCargo();
  //   }

  //   let importedItems: ISimpleItem[] = [];
  //   let allNames = this.getAllNames();
  //   itemsNamesList.forEach((name) => {
  //     if (
  //       name !== '' &&
  //       !allNames.find((i) => i.toLowerCase() === name.toLowerCase())
  //     ) {
  //       importedItems.push({
  //         name: name,
  //       });
  //     }
  //   });

  // let allCargos = this.cargosBS.value;
  // let looseItemsCargo = this.getDefaultCargo() ?? new CargoItem();
  // let newItems = [...destinationCargo?.items, ...importedItems];
  // destinationCargo.items = _.sortBy(_.uniqBy(newItems, 'name'), 'name');
  // this.cargosBS.next(allCargos);
  // this.updateForViews();

  // let allCargos = this.cargosBS.value;
  // let looseItemsCargo = this.getDefaultCargo() ?? new CargoItem();
  // let newLooseItems = [...looseItemsCargo?.items, ...importedItems];
  // looseItemsCargo.items = _.sortBy(_.uniqBy(newLooseItems, 'name'), 'name');
  // this.cargosBS.next(allCargos);
  // }

  // updateForViews(value?: ICargoItem[]) {
  //   if (value) {
  //     this.cargosBS.next(value);
  //   } else {
  //     this.cargosBS.next(this.cargosBS.value);
  //   }
  // }

  // moveItemToThrashByName(name: string) {
  //   this.cargosBS.value.forEach((c) => {
  //     // _.remove(c.items, (item) => item.name === '📦' + name + '📦');
  //   });
  // }

  // findItem(name: string): ISimpleItem | null {
  //   this.cargosBS.value.forEach((c) => {
  //     // return c.items.find((i) => i.name === name);
  //   });

  //   return null;
  // }

  // isCargoItemByName(name: string) {
  //   return name.startsWith('📦') && name.endsWith('📦');
  // }

  // getAllItems(): ISimpleItem[] {
  //   let list: ISimpleItem[] = [];
  //   // this.cargosBS.value.forEach((c) => (list = list.concat([...c.items])));

  //   return list;
  // }

  // importCargos(cargosNamesList: string[]) {
  //   let importedCargos: ICargoItem[] = [];

  //   cargosNamesList.forEach((name) => {
  //     if (
  //       name !== '' &&
  //       !this.getAllNames().find((i) => i.toLowerCase() === name.toLowerCase())
  //     ) {
  //       importedCargos.push({
  //         name: name.toUpperCase(),
  //         items: [],
  //       });
  //     }
  //   });

  //   let existingCargos = this.cargosBS.value;
  //   let newCargosList = [...existingCargos, ...importedCargos];
  //   existingCargos = _.sortBy(_.uniqBy(newCargosList, 'name'), 'name');
  //   this.cargosBS.next(existingCargos);

  //   this.importCargosAsItems(cargosNamesList);
  // }

  // importCargosAsItems(cargosNamesList: string[]) {
  //   let list = cargosNamesList.map((n) => (n = '📦' + n.toUpperCase() + '📦'));
  //   this.importItemsFromList(list);
  // }

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
