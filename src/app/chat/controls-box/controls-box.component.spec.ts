import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlsBoxComponent } from './controls-box.component';

describe('ControlsBoxComponent', () => {
  let component: ControlsBoxComponent;
  let fixture: ComponentFixture<ControlsBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlsBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
