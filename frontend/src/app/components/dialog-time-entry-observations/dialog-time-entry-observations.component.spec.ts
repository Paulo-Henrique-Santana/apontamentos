import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { DialogTimeEntryObservations } from '../../models/dialog-time-entry-observations';
import { DialogTimeEntryObservationsComponent } from './dialog-time-entry-observations.component';

describe('DialogTimeEntryObservationsComponent', () => {
  let component: DialogTimeEntryObservationsComponent;
  let fixture: ComponentFixture<DialogTimeEntryObservationsComponent>;
  
  const dialogData: DialogTimeEntryObservations = {
    date: '2023-10-01',
    projectName: 'Test Project',
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogTimeEntryObservationsComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dialogData },
        {
          provide: MatDialogRef,
          useValue: {
            afterOpened: () => of(void 0),
            close: jasmine.createSpy('close'),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogTimeEntryObservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
