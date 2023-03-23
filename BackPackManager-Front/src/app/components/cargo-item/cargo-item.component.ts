import { ItemService } from 'src/app/services/item.service';
import { CargoService } from './../../services/cargo.service';
import { AppService } from 'src/app/services/app-service.service';
import { CargoItem } from 'src/app/models/item.model';
import { ICargoItem, ISimpleItem } from '../../models/item.model';
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
  @Output() itemDropped = new EventEmitter();
  isEditionsEnabled = false;
  isCollapsed = false;
  dragPosition: Point;

  constructor(
    private appService: AppService,
    private cargoService: CargoService,
    private itemService: ItemService
  ) {
    this.dragPosition = this.cargo.dragPosition ?? { x: 0, y: 0 };
  }

  ngOnInit(): void {
    this.cargo.items = this.getSortedItems();
    this.dragPosition = this.cargo.dragPosition ?? { x: 0, y: 0 };
    this.appService.isEditionsEnabledBS.subscribe(
      (data) => (this.isEditionsEnabled = data)
    );
  }

  drop(event: CdkDragDrop<ISimpleItem[]>) {
    this.itemDropped.emit(event);
    this.cargo.items = this.getSortedItems();
  }

  dragEnd($event: CdkDragEnd) {
    this.cargo.dragPosition = $event.source.getFreeDragPosition();
  }

  getSortedItems(): ISimpleItem[] {
    return this.itemService.getSortedItems(this.cargo.items);
  }

  moveItemToThrash(event: ISimpleItem) {
    this.itemService.moveItemToThrash(event);
  }
}
