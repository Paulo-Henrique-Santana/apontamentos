import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSelectProjectComponent } from './dialog-select-project.component';

describe('DialogSelectProjectComponent', () => {
  let component: DialogSelectProjectComponent;
  let fixture: ComponentFixture<DialogSelectProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogSelectProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSelectProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
