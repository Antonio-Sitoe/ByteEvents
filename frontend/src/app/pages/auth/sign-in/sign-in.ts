import { Component } from '@angular/core';
import { ZardButtonComponent } from '@shared/components/button/button.component';
@Component({
  standalone: true,
  selector: 'app-sign-in',
  imports: [ZardButtonComponent],
  templateUrl: './sign-in.html',
})
export class SignIn {}
