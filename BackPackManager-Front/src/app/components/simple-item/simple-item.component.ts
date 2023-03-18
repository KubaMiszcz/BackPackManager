import { ISimpleItem, SimpleItem } from './../../models/item';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-simple-item',
  templateUrl: './simple-item.component.html',
  styleUrls: ['./simple-item.component.scss'],
})
export class SimpleItemComponent {
  @Input() item: ISimpleItem = new SimpleItem();

  constructor() {}

  alert(value:string){
    alert(value);
  }
}
