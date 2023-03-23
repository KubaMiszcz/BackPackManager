import { Component } from '@angular/core';
import { ICargoItem, ISimpleItem } from 'src/app/models/item.model';
import { AppService } from 'src/app/services/app-service.service';

@Component({
  selector: 'app-cargo-tree-tab',
  templateUrl: './cargo-tree-tab.component.html',
  styleUrls: ['./cargo-tree-tab.component.scss']
})
export class CargoTreeTabComponent {
  cargos: ICargoItem[] = [];

  constructor(private appService: AppService) {}
  
  ngOnInit(): void {
    this.appService.cargosBS.subscribe((data) => (this.cargos = data));
  }
}
