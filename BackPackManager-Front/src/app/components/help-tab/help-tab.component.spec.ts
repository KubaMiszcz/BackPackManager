import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpTabComponent } from './help-tab.component';

describe('HelpTabComponent', () => {
  let component: HelpTabComponent;
  let fixture: ComponentFixture<HelpTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
