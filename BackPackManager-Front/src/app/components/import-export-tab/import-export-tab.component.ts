import { ISimpleItem } from 'src/app/models/item';
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
  looseItems: ICargoItem[] = [];
  shelves: ICargoItem[] = [];

  itemsInput: string = '';
  cargosInput: string = '';

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.cargosBS.subscribe((data) => (this.cargos = data));
    // this.appService.looseItemsBS.subscribe((data) => (this.looseItems = data));
    // this.appService.shelvesBS.subscribe((data) => (this.shelves = data));
  }

  importItems() {
    let importedItems: ISimpleItem[] = [];
    this.prepareList(this.itemsInput).forEach((i) =>
      importedItems.push({
        name: i,
      })
    );

    let allCargos = this.appService.cargosBS.value;
    let looseItems = allCargos[0];
    let newLooseItems = [...looseItems.items, ...importedItems];
    //todo handle with duplicates in all cargos
    looseItems.items = _.sortBy(_.uniqBy(newLooseItems, 'name'), 'name');
    allCargos[0] = looseItems;
    this.appService.cargosBS.next(allCargos);
  }

  importCargos() {
    let importedCargos: ICargoItem[] = [];
    this.prepareList(this.cargosInput).forEach((i) =>
      importedCargos.push({
        name: i.toUpperCase(),
        items: [],
      })
    );

    let existingCargos = this.appService.cargosBS.value;
    let newCargosList = [...existingCargos, ...importedCargos];
    //todo handle with duplicates in all cargos
    // let existingItems = this.appService.getallitems();
    existingCargos = _.sortBy(_.uniqBy(newCargosList, 'name'), 'name');
    this.appService.cargosBS.next(existingCargos);
    console.log(existingCargos);
    
  }

  prepareList(list: string) {
    return _.uniq(list.split('\n')).filter((s) => s.length > 0);
  }
}
