import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProfileService {

  API = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

getProfile() {
  return this.http.get(this.API + '/profile');
}
getQuestions() {
  return this.http.get<any[]>(this.API + '/auth/security-questions');
}
updateProfile(data: any) {

  const token = localStorage.getItem('token');

  return this.http.put(
    'http://localhost:8080/api/profile',
    data,
    {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  );
}

updateQuestions(data: any) {

  const token = localStorage.getItem('token');

  return this.http.put(
    'http://localhost:8080/api/profile/security-questions',
    data,
    {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  );
}

changePassword(data: any) {
  return this.http.post(this.API + '/auth/change-password', data);
}

update2FA(data: any) {
  return this.http.post(this.API + '/auth/2fa', data);
}
toggle2FA(enabled: boolean) {

  const token = localStorage.getItem('token');

  return this.http.post(
    'http://localhost:8080/api/profile/2fa',
    { enabled: enabled },
    {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  );
}
}
