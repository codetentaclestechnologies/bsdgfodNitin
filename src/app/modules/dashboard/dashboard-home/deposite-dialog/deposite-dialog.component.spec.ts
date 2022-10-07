import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositeDialogComponent } from './deposite-dialog.component';

describe('DepositeDialogComponent', () => {
  let component: DepositeDialogComponent;
  let fixture: ComponentFixture<DepositeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
