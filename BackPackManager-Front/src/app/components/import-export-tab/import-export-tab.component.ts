import { CargoItem, ISimpleItem, Nullable } from 'src/app/models/item';
import { ICargoItem } from './../../models/item';
import { AppService } from 'src/app/services/app-service.service';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-import-export-tab',
  templateUrl: './import-export-tab.component.html',
  styleUrls: ['./import-export-tab.component.scss'],
})
export class ImportExportTabComponent implements OnInit {
  cargos: ICargoItem[] = [];
  items: ISimpleItem[] = [];

  itemsInput: string = '';
  cargosInput: string = '';
  cargoName: string = '';
  fromCargo: boolean = false;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.cargosBS.subscribe((data) => {
      this.cargos = _.sortBy(data, 'name');
      this.items = _.sortBy(
        this.appService
          .getAllItems()
          .filter((i) => !this.appService.isCargoItemByName(i.name)),
        'name'
      );
    });
  }

  importItems() {
    let itemsNamesList = this.prepareList(this.itemsInput);
    this.appService.importItemsFromList(itemsNamesList, this.fromCargo);
    this.fromCargo = false;
    this.itemsInput = '';
  }

  importCargos(cargosNamesList?: string[]) {
    if (!cargosNamesList) {
      cargosNamesList = this.prepareList(this.cargosInput);
    }

    this.appService.importCargos(cargosNamesList);
    this.cargosInput = '';
  }

  prepareList(list: string) {
    return _.uniq(list.split('\n'))
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }

  moveItemToThrash(event: ISimpleItem) {
    this.appService.moveItemToThrash(event);
  }

  moveCargoToThrash(event: ICargoItem) {
    this.appService.moveCargoToThrash(event);
  }
  
  togglePinItem(event: ISimpleItem) {
    this.appService.togglePinItem(event);
  }

  isCargoItem(name: string) {
    return this.appService.isCargoItemByName(name);
  }
}
