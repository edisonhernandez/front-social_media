import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HometweetsComponent } from './hometweets.component';

describe('HometweetsComponent', () => {
  let component: HometweetsComponent;
  let fixture: ComponentFixture<HometweetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HometweetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HometweetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
