import { StorageItem } from './../models/item';
import { Component } from '@angular/core';
import { SimpleItem } from '../models/item';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-back-pack-tab',
  templateUrl: './back-pack-tab.component.html',
  styleUrls: ['./back-pack-tab.component.scss'],
})
export class BackPackTabComponent {
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  cargos = cargos;
  items = items;

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


const items: SimpleItem[] = [
  {
    name: 'nozyk',
  },
  {
    name: 'zapalniczka',
  },
  {
    name: 'lyzka',
  },
  {
    name: 'widelec',
  },
  {
    name: 'latarka',
  }
];


const cargos: StorageItem[] = [
  {
    name: 'PTcargo',
    items: [
      {
        name: 'widelec',
      },
      {
        name: 'latarka',
      },
    ],
  },
  {
    name: 'worekmaly',
    items:[],
  },
  {
    name: 'plecak wisport',
    items:[],
  },
];