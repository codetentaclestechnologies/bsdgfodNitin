import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositeDetailsComponent } from './deposite-details.component';

describe('DepositeDetailsComponent', () => {
  let component: DepositeDetailsComponent;
  let fixture: ComponentFixture<DepositeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositeDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
