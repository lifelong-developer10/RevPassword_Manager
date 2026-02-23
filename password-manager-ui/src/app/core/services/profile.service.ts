import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private API = 'http://localhost:8080/api/profile';

  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get(this.API);
  }

  updateProfile(data: any) {
    return this.http.put(this.API, data);
  }
}
