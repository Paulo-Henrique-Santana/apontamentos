import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogFormProjectData } from '../../models/dialog-form-project-data';
import { DialogFormProjectComponent } from './dialog-form-project.component';

describe('DialogFormProjectComponent quando recebe dados do projeto', () => {
  let component: DialogFormProjectComponent;
  let fixture: ComponentFixture<DialogFormProjectComponent>;
  const data: DialogFormProjectData = {
    title: 'Editar Projeto',
    txtBtnSubmit: 'Salvar',
    project: { id: 1, name: 'Projeto Teste' },
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [DialogFormProjectComponent],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: data }],
    });

    fixture = TestBed.createComponent(DialogFormProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve adicionar os dados do projeto no formulário', () => {
    component.setFormData();
    
    expect(component.form.value).toEqual({ name: data.project!.name });
  });
});

describe('DialogFormProjectComponent quando não recebe dados do projeto', () => {
  let component: DialogFormProjectComponent;
  let fixture: ComponentFixture<DialogFormProjectComponent>;
  const data: DialogFormProjectData = {
    title: 'Adicionar Projeto',
    txtBtnSubmit: 'Salvar',
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [DialogFormProjectComponent],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: data }],
    });

    fixture = TestBed.createComponent(DialogFormProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('não deve tentar adicionar os dados do projeto no formulário', () => {
    const spy = spyOn(component.form, 'patchValue');

    component.setFormData();

    expect(spy).not.toHaveBeenCalled();
  });
});
