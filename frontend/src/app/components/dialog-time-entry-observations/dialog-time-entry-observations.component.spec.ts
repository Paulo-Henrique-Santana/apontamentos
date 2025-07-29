import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTimeEntryObservationsComponent } from './dialog-time-entry-observations.component';

describe('DialogTimeEntryObservationsComponent', () => {
  let component: DialogTimeEntryObservationsComponent;
  let fixture: ComponentFixture<DialogTimeEntryObservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogTimeEntryObservationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogTimeEntryObservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
