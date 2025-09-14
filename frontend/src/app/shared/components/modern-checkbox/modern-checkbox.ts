import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modern-checkbox',
  imports: [],
  templateUrl: './modern-checkbox.html',
})
export class ModernCheckbox {
  @Input() checked: boolean = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  toggleCheck() {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
