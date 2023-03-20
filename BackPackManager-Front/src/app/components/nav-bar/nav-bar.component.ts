import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  @Output() saveData = new EventEmitter();
  @Output() loadData = new EventEmitter();
  @Output() reInitData = new EventEmitter();
  @Output() resetPositions = new EventEmitter();
  @Output() savePositions = new EventEmitter();
  @Output() toggleDeletions = new EventEmitter();
}
