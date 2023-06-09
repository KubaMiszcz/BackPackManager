import { AppService } from './services/app-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'BackPackManager';

  constructor(private appService: AppService) {}

  saveData() {
    this.appService.saveData();
  }

  loadData() {
    this.appService.loadData();
  }

  reInitData() {
    this.appService.reInitData();
  }

  resetPositions() {
    this.appService.resetPositions();
  }

  savePositions() {
    this.appService.savePositions();
  }

  toggleEditions() {
    this.appService.toggleEditions();
  }

  exportToClipboard() {
    this.appService.exportToClipboard();
  }

  searchForItem(value: string) {
    this.appService.searchForItem(value);
  }
}
