import { ItemService } from 'src/app/services/item.service';
import { CargoService } from './../../services/cargo.service';
import { AppService } from 'src/app/services/app-service.service';
import { CargoItem } from 'src/app/models/item';
import { ICargoItem, ISimpleItem } from './../../models/item';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CdkDragDrop, CdkDragEnd, Point } from '@angular/cdk/drag-drop';
import * as _ from 'lodash';

@Component({
  selector: 'app-cargo-item',
  templateUrl: './cargo-item.component.html',
  styleUrls: ['./cargo-item.component.scss'],
})
export class CargoItemComponent implements OnInit {
  @Input() cargo: ICargoItem = new CargoItem();
  cargoItems: ISimpleItem[] = [];
  @Output() itemDropped = new EventEmitter();
  isCollapsed = false;
  dragPosition: Point;

  constructor(
    private appService: AppService,
    private cargoService: CargoService
  ) {
    this.dragPosition = this.cargo.dragPosition ?? { x: 0, y: 0 };
  }

  ngOnInit(): void {
    this.cargoItems = this.getSortedItems();
    this.dragPosition = this.cargo.dragPosition ?? { x: 0, y: 0 };
  }
  
  drop(event: CdkDragDrop<ISimpleItem[]>) {
    console.log(event);
    this.itemDropped.emit(event);
    // this.cargoItems = this.getSortedItems();
  }

  dragEnd($event: CdkDragEnd) {
    this.cargo.dragPosition = $event.source.getFreeDragPosition();
  }

  private getSortedItems(): ISimpleItem[] {
    return null ;//_.sortBy(this.cargoService.getItemsForCargo(this.cargo), 'name');
  }
}
