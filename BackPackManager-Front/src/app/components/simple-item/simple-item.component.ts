import { AppService } from 'src/app/services/app-service.service';
import { ISimpleItem, SimpleItem } from '../../models/item.model';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-simple-item',
  templateUrl: './simple-item.component.html',
  styleUrls: ['./simple-item.component.scss'],
})
export class SimpleItemComponent {
  @Input() item: ISimpleItem = new SimpleItem();
  @Input() isEditionsEnabled = false;
  @Output() itemDeleted = new EventEmitter();

  constructor(private appService: AppService) {}

  alert(value: string) {
    alert(value);
  }
}
