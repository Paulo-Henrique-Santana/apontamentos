import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogSelectProjectData } from '../../models/dialog-select-project';
import { ProjectService } from '../../services/project.service';
import { DialogSelectProjectComponent } from './dialog-select-project.component';

describe('DialogSelectProjectComponent', () => {
  let component: DialogSelectProjectComponent;
  let fixture: ComponentFixture<DialogSelectProjectComponent>;

  const dialogData: DialogSelectProjectData = {
    selectedProjects: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogSelectProjectComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dialogData },
        ProjectService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogSelectProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
