import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { ICargoItem, ISimpleItem } from 'src/app/models/item';
import { AppService } from 'src/app/services/app-service.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-back-pack-tab',
  templateUrl: './back-pack-tab.component.html',
  styleUrls: ['./back-pack-tab.component.scss'],
})
export class BackPackTabComponent {
  cargos: ICargoItem[] = [];

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.cargosBS.subscribe((data) => (this.cargos = data));
  }

  // drop(event: CdkDragDrop<ICargoItem[]>) {
  //   moveItemInArray(this.cargos, event.previousIndex, event.currentIndex);
  // }

  transferItem(event: CdkDragDrop<ISimpleItem[]>) {
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

   console.log(event.container.data);
  }
}
