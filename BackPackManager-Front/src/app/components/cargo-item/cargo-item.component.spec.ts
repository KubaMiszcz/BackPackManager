import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoItemComponent } from './cargo-item.component';

describe('CargoItemComponent', () => {
  let component: CargoItemComponent;
  let fixture: ComponentFixture<CargoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargoItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
