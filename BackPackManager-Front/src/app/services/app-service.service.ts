import { AppData } from './../models/app-data';
import { SimpleItem, CargoItem } from './../models/item';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  cargos = cargos;
  subject = new BehaviorSubject(0);
  looseItems = looseItems;
  shelves = shelves;

  constructor() {}

  saveData() {
    let appData: AppData = {
      cargos: cargos,
      looseItems: looseItems,
      longStorageItems: shelves,
    };
    localStorage.setItem('BackPackManagerData', JSON.stringify(appData));
  }

  loadData() {
    let appData: AppData = {
      cargos: cargos,
      looseItems: looseItems,
      longStorageItems: shelves,
    };
    let data: AppData = JSON.parse(
      localStorage.getItem('BackPackManagerData') ?? ''
    );
    this.cargos = data.cargos;
    this.looseItems = data.looseItems;
    this.shelves = data.longStorageItems;
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
  },
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
    items: [],
  },
  {
    name: 'plecak wisport',
    items: [],
  },
];

const shelves: CargoItem[] = [
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
