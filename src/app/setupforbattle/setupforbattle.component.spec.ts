import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupforbattleComponent } from './setupforbattle.component';

describe('SetupforbattleComponent', () => {
  let component: SetupforbattleComponent;
  let fixture: ComponentFixture<SetupforbattleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupforbattleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupforbattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
