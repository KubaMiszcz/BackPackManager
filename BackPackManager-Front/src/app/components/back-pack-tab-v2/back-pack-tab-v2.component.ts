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
  selector: 'app-back-pack-tab-v2',
  templateUrl: './back-pack-tab-v2.component.html',
  styleUrls: ['./back-pack-tab-v2.component.scss'],
})
export class BackPackTabV2Component {
  cargos: ICargoItem[] = [];

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.cargosBS.subscribe((data) => (this.cargos = data));
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
