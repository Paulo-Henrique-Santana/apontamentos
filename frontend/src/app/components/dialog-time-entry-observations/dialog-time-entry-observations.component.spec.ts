import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { DialogTimeEntryObservations } from '../../models/dialog-time-entry-observations';
import { DialogTimeEntryObservationsComponent } from './dialog-time-entry-observations.component';

describe('DialogTimeEntryObservationsComponent', () => {
  let component: DialogTimeEntryObservationsComponent;
  let fixture: ComponentFixture<DialogTimeEntryObservationsComponent>;
  let dialogRefSpy: jasmine.SpyObj<
    MatDialogRef<DialogTimeEntryObservationsComponent>
  >;

  const dialogData: DialogTimeEntryObservations = {
    date: '2023-10-01',
    projectName: 'Test Project',
  };

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close', 'afterOpened']);

    dialogRefSpy.afterOpened.and.returnValue(of(void 0));

    TestBed.configureTestingModule({
      imports: [DialogTimeEntryObservationsComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dialogData },
        { provide: MatDialogRef, useValue: dialogRefSpy },
      ],
    });

    fixture = TestBed.createComponent(DialogTimeEntryObservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar dialogRef.close ao executar onCancel', () => {
    component.onCancel();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});
