import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-date-control',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './date-control.component.html',
  styleUrl: './date-control.component.scss'
})
export class DateControlComponent {
  @Output() next = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();
  @Output() today = new EventEmitter<void>();
  @Input() disabledToday = false;
}
