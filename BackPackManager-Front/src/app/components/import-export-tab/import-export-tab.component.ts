import { CargoService } from './../../services/cargo.service';
import { CargoItem, ISimpleItem, Nullable } from 'src/app/models/item';
import { ICargoItem } from './../../models/item';
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
  cargoName: string = '';
  fromCargo: boolean = false; //DEPR

  constructor(
    private appService: AppService,
    private cargoService: CargoService,
    private itemService: ItemService,

  ) {}

  ngOnInit(): void {
    this.appService.cargosBS.subscribe(
      (data) => (this.cargos = _.sortBy(data, 'name'))
    );
    this.appService.itemsBS.subscribe(
      (data) => (this.items = _.sortBy(data, 'name'))
    );
  }

  getNumberOfCargoItems(cargo:ICargoItem){
    return this.cargoService.getNumberOfCargoItems(cargo);
  }

  importItems() {
    console.log(this.itemsInput);
    
    this.itemService.importItemsFromString(this.itemsInput);
    // this.itemsInput = '';
  }

















  importCargos(cargosNamesList?: string[]) {
    if (!cargosNamesList) {
      cargosNamesList = this.prepareList(this.cargosInput);
    }

    this.appService.importCargos(cargosNamesList);
    this.cargosInput = '';
  }

  prepareList(list: string) { //depr
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
