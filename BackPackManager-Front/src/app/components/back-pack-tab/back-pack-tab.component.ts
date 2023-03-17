import { CargoItem } from 'src/app/models/item';
import { AppService } from './../../services/app-service.service';
import { ICargoItem } from '../../models/item';
import { Component, Input, OnInit } from '@angular/core';
import { ISimpleItem } from '../../models/item';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-back-pack-tab',
  templateUrl: './back-pack-tab.component.html',
  styleUrls: ['./back-pack-tab.component.scss'],
})
export class BackPackTabComponent implements OnInit {
  cargos: ICargoItem[] = [];
  looseItems: ICargoItem[] = [];
  shelves: ICargoItem[] = [];

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.cargosBS.subscribe((data) => (this.cargos = data));
    this.appService.looseItemsBS.subscribe((data) => (this.looseItems = data));
    this.appService.shelvesBS.subscribe((data) => (this.shelves = data));
  }

  drop(event: CdkDragDrop<ISimpleItem[]> | CdkDragDrop<ICargoItem[]>) {
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

