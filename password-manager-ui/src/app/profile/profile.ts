import { Component } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html'
})
export class ProfileComponent {

  user = {
    name: '',
    email: '',
    phone: ''
  };

}
