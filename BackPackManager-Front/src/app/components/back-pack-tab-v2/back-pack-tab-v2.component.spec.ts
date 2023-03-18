import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackPackTabV2Component } from './back-pack-tab-v2.component';

describe('BackPackTabV2Component', () => {
  let component: BackPackTabV2Component;
  let fixture: ComponentFixture<BackPackTabV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackPackTabV2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackPackTabV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
