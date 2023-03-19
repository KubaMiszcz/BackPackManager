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
    this.appService.importItemsFromList(itemsNamesList);
  }

  importCargos() {
    let cargosNamesList = this.prepareList(this.cargosInput);
    let importedCargos: ICargoItem[] = [];
    cargosNamesList.forEach((name) => {
      if (!this.appService.getAllNames().find((i) => i.toLowerCase() === name.toLowerCase())) {
        importedCargos.push({
          name: name.toUpperCase(),
          items: [],
        });
      }
    });

    let existingCargos = this.appService.cargosBS.value;
    let newCargosList = [...existingCargos, ...importedCargos];
    existingCargos = _.sortBy(_.uniqBy(newCargosList, 'name'), 'name');
    this.appService.cargosBS.next(existingCargos);

    this.importCargosAsItems(cargosNamesList);
  }

  importCargosAsItems(cargosNamesList: string[]) {
    let list = cargosNamesList.map((n) => (n = '📦' + n.toUpperCase() + '📦'));
    this.appService.importItemsFromList(list);
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

  isCargoItem(name: string) {
    return this.appService.isCargoItemByName(name);
  }
}
