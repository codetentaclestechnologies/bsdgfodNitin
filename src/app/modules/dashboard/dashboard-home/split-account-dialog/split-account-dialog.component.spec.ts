import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitAccountDialogComponent } from './split-account-dialog.component';

describe('SplitAccountDialogComponent', () => {
  let component: SplitAccountDialogComponent;
  let fixture: ComponentFixture<SplitAccountDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplitAccountDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplitAccountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
