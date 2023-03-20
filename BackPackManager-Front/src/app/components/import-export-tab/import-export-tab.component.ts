import { CargoService } from './../../services/cargo.service';
import { CargoItem, ISimpleItem, Nullable } from 'src/app/models/item.model';
import { ICargoItem } from '../../models/item.model';
import { AppService } from 'src/app/services/app-service.service';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { ItemService } from 'src/app/services/item.service';

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

  constructor(
    private appService: AppService,
    private cargoService: CargoService,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    this.appService.cargosBS.subscribe((data) => {
      this.cargos = _.sortBy(data, 'name');
      this.items = _.sortBy(
        _.sortBy(this.itemService.getAllItems(), 'name'),
        'isCargo'
      );

      this.items = this.itemService.getSortedItems(
        this.itemService.getAllItems()
      );
    });
  }

  importItems() {
    this.itemService.importItemsFromString(this.itemsInput);
    this.itemsInput = '';
  }

  batchImportItems() {}

  importCargos() {
    this.cargoService.importCargosFromString(this.cargosInput);
    this.itemsInput = '';
  }

  moveItemToThrash(event: ISimpleItem) {
    this.itemService.moveItemToThrash(event);
  }

  moveCargoToThrash(event: ICargoItem) {
    this.cargoService.moveCargoToThrash(event);
  }

  togglePinItem(event: ISimpleItem) {
    this.itemService.togglePinItem(event);
  }

  //////////////////////////////
  //////////////////////////////
  //////////////////////////////
  //////////////////////////////
  //////////////////////////////
  //////////////////////////////
  //////////////////////////////
  //////////////////////////////
  //////////////////////////////
  //////////////////////////////
  //////////////////////////////
  //////////////////////////////
  //////////////////////////////
  //////////////////////////////
  //////////////////////////////
  //////////////////////////////
  //////////////////////////////

  // isCargoItem(name: string) {
  //   return this.appService.isCargoItemByName(name);
  // }
}
