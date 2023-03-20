import { ItemService } from 'src/app/services/item.service';
import { Injectable } from '@angular/core';
import { ICargoItem } from '../models/item';
import { BehaviorSubject } from 'rxjs';
import { AppService } from './app-service.service';

@Injectable({
  providedIn: 'root',
})
export class CargoService {
  constructor(
    private appService: AppService,
    private itemService: ItemService
  ) {}

  getNumberOfCargoItems(cargo: ICargoItem) {
    this.itemService.getItemsForCargo(cargo)?.length;
  }

  findCargo(cargo: ICargoItem) {
    return this.appService.cargosBS.value?.find((c) => c === cargo);
  }
}
