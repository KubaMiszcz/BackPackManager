import { AppService } from './../../services/app-service.service';
import { CargoItem } from '../../models/item';
import { Component, Input, OnInit } from '@angular/core';
import { SimpleItem } from '../../models/item';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-back-pack-tab',
  templateUrl: './back-pack-tab.component.html',
  styleUrls: ['./back-pack-tab.component.scss'],
})
export class BackPackTabComponent implements OnInit {
  @Input() cargos: CargoItem[] = [];
  @Input() simpleItems: SimpleItem[] = [];

  constructor(private appService: AppService) {}
  ngOnInit(): void {
    this.cargos = this.appService.cargos;
    this.simpleItems = this.appService.looseItems;
  }

  drop2(event: CdkDragDrop<SimpleItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  drop(event: CdkDragDrop<SimpleItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}

