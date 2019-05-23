import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcodedialogComponent } from './showcodedialog.component';

describe('ShowcodedialogComponent', () => {
  let component: ShowcodedialogComponent;
  let fixture: ComponentFixture<ShowcodedialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowcodedialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcodedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
