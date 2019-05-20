import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomcreatorComponent } from './roomcreator.component';

describe('RoomcreatorComponent', () => {
  let component: RoomcreatorComponent;
  let fixture: ComponentFixture<RoomcreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomcreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomcreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
