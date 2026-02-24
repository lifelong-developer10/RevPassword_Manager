import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private API = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // ================= PROFILE =================

  getProfile(): Observable<any> {
    return this.http.get(`${this.API}/profile`);
  }

  updateProfile(data: any): Observable<any> {
    return this.http.put(`${this.API}/profile`, data);
  }

  // ================= SECURITY QUESTIONS =================

  getQuestions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/auth/security-questions`);
  }

  updateQuestions(data: any): Observable<any> {
    return this.http.put(`${this.API}/profile/security-questions`, data);
  }

  // ================= CHANGE PASSWORD =================

  changePassword(data: any): Observable<any> {
    return this.http.post(`${this.API}/profile/change-password`, data);
  }

  // ================= TWO FACTOR =================

  update2FA(enabled: boolean): Observable<any> {
    return this.http.post(`${this.API}/profile/2fa`, { enabled });
  }

}
