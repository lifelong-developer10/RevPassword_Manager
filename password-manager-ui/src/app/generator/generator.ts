import { Component } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.html'
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
