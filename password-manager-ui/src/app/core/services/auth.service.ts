import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl;


constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(`${this.baseUrl}/auth/register`, data);
  }

  login(data: any) {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
verifyMasterPassword(password: string) {
  return this.http.post(
    `${this.baseUrl}/api/auth/verify-master-password`,
    { masterPassword: password }
  );
}
getProfile() {
  return this.http.get(`${this.baseUrl}/api/users/profile`);
}

updateProfile(data: any) {
  return this.http.put(`${this.baseUrl}/api/users/profile`, data);
}
changePassword(data: any) {
  return this.http.post(`${this.baseUrl}/api/auth/change-password`, data);
}

getSecurityQuestions() {
  return this.http.get(`${this.baseUrl}/api/security-questions`);
}

updateSecurityQuestions(data: any) {
  return this.http.put(`${this.baseUrl}/api/security-questions`, data);
}
requestRecovery(email: string) {
  return this.http.post(`${this.baseUrl}/api/auth/forgot-password`, { email });
}

sendOtp(email: string) {
   this.method = 'otp';
  return this.http.post(`${this.baseUrl}/api/auth/send-otp`, { email });
}

verifyOtp(data: any) {
  return this.http.post(`${this.baseUrl}/api/auth/verify-otp`, data);
}

getRecoveryQuestions(email: string) {
  this.method = 'questions';
  return this.http.get(`${this.baseUrl}/api/security-questions/recovery?email=${email}`);
}

verifySecurityAnswers(data: any) {
  return this.http.post(`${this.baseUrl}/api/security-questions/verify`, data);
}

resetPassword(data: any) {
  return this.http.post(`${this.baseUrl}/api/auth/reset-password`, data);
}
enable2FA() {
  return this.http.post(`${this.baseUrl}/api/auth/2fa/enable`, {});
}

verify2FA(code: string) {
  return this.http.post(`${this.baseUrl}/api/auth/2fa/verify`, { code });
}

disable2FA() {
  return this.http.post(`${this.baseUrl}/api/auth/2fa/disable`, {});
}
}
