import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.html',
   imports: [CommonModule, FormsModule]
})
export class GeneratorComponent {

  password = '';

  generate() {

    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%';

    let pass = '';

    for (let i = 0; i < 12; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    this.password = pass;
  }

}
