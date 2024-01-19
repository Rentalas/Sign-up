import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

export enum PasswordAnnotation {
  empty = '',
  lessCharacters = 'Password must contain more than 8 characters',
  easy = 'Password is easy',
  medium = 'Password is medium',
  strong = 'Password is strong',
}

@Component({
  selector: 'password-strength-check',
  templateUrl: './password-strength-check.component.html',
  styleUrls: ['./password-strength-check.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule],
})
export class PasswordStrengthCheckComponent {
  hide:boolean = true;
  password: string = '';
  passwordStrengthColor: string[] = ['', '', ''];
  passwordAnnotation: PasswordAnnotation = PasswordAnnotation.empty;

  checkPassword() {
    const lengthCondition = this.password.length >= 8;
    const mediumCondition = /^(?=.*[a-zA-Z])(?=.*[0-9])|(?=.*[a-zA-Z])(?=.*[!@#\$%\^&\\(\\)\*])|(?=.*[0-9])(?=.*[!@#\$%\^&\\(\\)\*])/.test(this.password);
    const strongCondition = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\\(\\)\*])/.test(this.password);

    if (!this.password) {
      this.passwordStrengthColor = ['', '', ''];
      this.passwordAnnotation = PasswordAnnotation.empty;
      return;
    }

    if (!lengthCondition) {
      this.passwordStrengthColor = ['#FF0000', '#FF0000', '#FF0000'];
      this.passwordAnnotation = PasswordAnnotation.lessCharacters;
      return;
    }

    if (strongCondition) {
      this.passwordStrengthColor = ['#008000', '#008000', '#008000'];
      this.passwordAnnotation = PasswordAnnotation.strong;
      return;
    }

    if (mediumCondition) {
      this.passwordStrengthColor = ['#FFFF00', '#FFFF00', ''];
      this.passwordAnnotation = PasswordAnnotation.medium;
      return;
    }
  }
}


