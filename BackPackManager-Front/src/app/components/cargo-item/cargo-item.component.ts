import { CargoItem } from 'src/app/models/item';
import { ICargoItem, ISimpleItem } from './../../models/item';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import * as _ from "lodash";

@Component({
  selector: 'app-cargo-item',
  templateUrl: './cargo-item.component.html',
  styleUrls: ['./cargo-item.component.scss'],
})
export class CargoItemComponent {
  @Input() cargo: ICargoItem = new CargoItem();
  @Output() itemDropped = new EventEmitter();
  isCollapsed = false;

  constructor() {}

  drop(event: CdkDragDrop<ISimpleItem[]> | CdkDragDrop<ICargoItem[]>) {
    this.itemDropped.emit(event);
    this.cargo.items=_.sortBy(this.cargo.items,'name');
  }
}


