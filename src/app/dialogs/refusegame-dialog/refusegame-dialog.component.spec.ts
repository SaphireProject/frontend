import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefusegameDialogComponent } from './refusegame-dialog.component';

describe('RefusegameDialogComponent', () => {
  let component: RefusegameDialogComponent;
  let fixture: ComponentFixture<RefusegameDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefusegameDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefusegameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
