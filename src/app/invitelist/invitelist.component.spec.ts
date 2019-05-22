import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitelistComponent } from './invitelist.component';

describe('InvitelistComponent', () => {
  let component: InvitelistComponent;
  let fixture: ComponentFixture<InvitelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
