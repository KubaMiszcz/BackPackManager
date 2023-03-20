import { HelperService } from './../../services/helper.service';
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
    private itemService: ItemService,
    private helperService: HelperService
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
    this.itemService.importItemsFromString(this.itemsInput.split('\n'));
    this.itemsInput = '';
  }

  batchImportItems() {
    let list = this.helperService.prepareNamesList(this.itemsInput.split('\n'));
    let cargos: string[][] = [];
    let cargo: string[] = [];
    cargo.push(list.shift().slice(1));

    list.forEach((n) => {
      if (n.startsWith('>')) {
        cargos.push(cargo);
        cargo = [];
        n = n.slice(1);
      }
      cargo.push(n);
    });

    cargos.push(cargo);

    cargos.forEach((c) => {
      let destinationCargoName = c.shift();
      this.cargoService.importCargosFromString(destinationCargoName);
      this.itemService.importItemsFromString(c, destinationCargoName);
    });

    this.itemsInput = '';
  }

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
