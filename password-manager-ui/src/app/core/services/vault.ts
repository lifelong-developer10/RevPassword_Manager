import { Injectable } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VaultService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Get all passwords
  getAll() {
    return this.http.get(`${this.baseUrl}/passwords`);
  }

  // Add password
  add(data: any) {
    return this.http.post(`${this.baseUrl}/passwords`, data);
  }

  // Update password
  update(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/passwords/${id}`, data);
  }

  // Delete password
  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/passwords/${id}`);
  }

}
