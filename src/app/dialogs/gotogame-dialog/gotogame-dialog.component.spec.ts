import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GotogameDialogComponent } from './gotogame-dialog.component';

describe('GotogameDialogComponent', () => {
  let component: GotogameDialogComponent;
  let fixture: ComponentFixture<GotogameDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GotogameDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GotogameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
