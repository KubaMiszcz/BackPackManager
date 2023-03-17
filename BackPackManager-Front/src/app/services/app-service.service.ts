import { AppData } from './../models/app-data';
import { SimpleItem, CargoItem } from './../models/item';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  cargosBS = new BehaviorSubject(DEFAULT_CARGOS);
  looseItemsBS = new BehaviorSubject(DEFAULT_LOOSEITEMS);
  shelvesBS = new BehaviorSubject(DEFAULT_SHELVES);

  constructor() {}

  saveData() {
    let appData: AppData = {
      cargos: this.cargosBS.value,
      looseItems: this.looseItemsBS.value,
      longStorageItems: this.shelvesBS.value,
    };
    localStorage.setItem('BackPackManagerData', JSON.stringify(appData));
  }

  loadData() {
    let data: AppData = JSON.parse(
      localStorage.getItem('BackPackManagerData') ?? ''
    );

    this.cargosBS.next(data.cargos);
    this.looseItemsBS.next(data.looseItems);
    this.shelvesBS.next(data.longStorageItems);
  }
}

const DEFAULT_LOOSEITEMS: SimpleItem[] = [
  {
    name: 'nozyk',
  },
  {
    name: 'zapalniczka',
  },
  {
    name: 'lyzka',
  },
  {
    name: 'widelec',
  },
  {
    name: 'latarka',
  },
];

const DEFAULT_CARGOS: CargoItem[] = [
  {
    name: 'PTcargo',
    items: [
      {
        name: 'widelec',
      },
      {
        name: 'latarka',
      },
    ],
  },
  {
    name: 'worekmaly',
    items: [],
  },
  {
    name: 'plecak wisport',
    items: [],
  },
];

const DEFAULT_SHELVES: CargoItem[] = [
  {
    name: 'pudlo',
    items: [
      {
        name: 'widelec',
      },
      {
        name: 'latarka',
      },
    ],
  },
  {
    name: 'szafa',
    items: [],
  },
  {
    name: 'szuflada',
    items: [],
  },
];
