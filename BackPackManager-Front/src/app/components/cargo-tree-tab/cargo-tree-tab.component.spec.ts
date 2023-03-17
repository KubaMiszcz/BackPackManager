import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoTreeTabComponent } from './cargo-tree-tab.component';

describe('CargoTreeTabComponent', () => {
  let component: CargoTreeTabComponent;
  let fixture: ComponentFixture<CargoTreeTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargoTreeTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargoTreeTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
