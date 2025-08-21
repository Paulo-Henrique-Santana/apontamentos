import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { SnackBarData, SnackBarType } from '../../models/snack-bar';
import { SnackBarComponent } from './snack-bar.component';

describe('SnackBarComponent', () => {
  let component: SnackBarComponent;
  let fixture: ComponentFixture<SnackBarComponent>;

  const snackBarData: SnackBarData = {
    message: 'Test message',
    type: SnackBarType.SUCCESS,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnackBarComponent],
      providers: [
        {
          provide: MatSnackBarRef,
          useValue: {},
        },
        {
          provide: MAT_SNACK_BAR_DATA,
          useValue: snackBarData,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
