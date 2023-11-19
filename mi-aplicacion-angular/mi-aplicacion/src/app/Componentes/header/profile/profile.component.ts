// profile.component.ts
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  @Output() closeProfileEvent = new EventEmitter();

  closeProfile() {
    this.closeProfileEvent.emit();
  }
}