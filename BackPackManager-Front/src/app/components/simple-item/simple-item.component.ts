import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-simple-item',
  templateUrl: './simple-item.component.html',
  styleUrls: ['./simple-item.component.scss'],
})
export class SimpleItemComponent {
  @Input() name = '';
}
