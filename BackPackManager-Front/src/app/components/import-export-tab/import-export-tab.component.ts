import { ISimpleItem } from 'src/app/models/item';
import { ICargoItem } from './../../models/item';
import { AppService } from 'src/app/services/app-service.service';
import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";


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

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.cargosBS.subscribe((data) => (this.cargos = data));
    this.appService.looseItemsBS.subscribe((data) => (this.looseItems = data));
    this.appService.shelvesBS.subscribe((data) => (this.shelves = data));
  }

  importItems() {
    let importedItems: ISimpleItem[] = [];
    this.itemsInput.split('\n')
    .filter((s) => s.length > 0)
    .forEach((i) =>
      importedItems.push({
        name: i,
      })
    );

    let existingItems = this.appService.looseItemsBS.value;
    let newItemsList = [...existingItems[0].items,...importedItems];
    //todo handle with duplicates in all cargos
    existingItems[0].items = _.uniqBy(newItemsList, 'name');
    this.appService.looseItemsBS.next(existingItems);
  }
}
