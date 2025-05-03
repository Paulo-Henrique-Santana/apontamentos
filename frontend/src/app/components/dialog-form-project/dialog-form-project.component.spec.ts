import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormProjectComponent } from './dialog-form-project.component';

describe('DialogFormProjectComponent', () => {
  let component: DialogFormProjectComponent;
  let fixture: ComponentFixture<DialogFormProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogFormProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogFormProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
