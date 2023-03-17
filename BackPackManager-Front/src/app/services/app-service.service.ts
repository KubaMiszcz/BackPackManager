import { AppData } from './../models/app-data';
import { SimpleItem, CargoItem } from './../models/item';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  cargos = cargos;
  looseItems = looseItems;
  shelves = storageItems;

  constructor() {}

  saveData() {
    let appData: AppData = {
      cargos: cargos,
      looseItems:looseItems,
      longStorageItems:storageItems,
    };
    localStorage.setItem('BackPackManagerData', JSON.stringify(appData));
  }
}

const looseItems: SimpleItem[] = [
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
  }
];


const cargos: CargoItem[] = [
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
    items:[],
  },
  {
    name: 'plecak wisport',
    items:[],
  },
];


const storageItems: CargoItem[] = [
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
    items:[],
  },
  {
    name: 'szuflada',
    items:[],
  },
];