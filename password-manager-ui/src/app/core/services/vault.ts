import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VaultService {

  private baseUrl = environment.apiUrl + '/api/vault';

  constructor(private http: HttpClient) {}

  // Add entry
  add(data: any) {
    return this.http.post(this.baseUrl, data);
  }

  // Get all entries
  getAll() {
    return this.http.get(this.baseUrl);
  }

  // Get single
  getOne(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Update
  update(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  // Delete
  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // Search
  search(keyword: string) {
    return this.http.get(`${this.baseUrl}/search?keyword=${keyword}`);
  }

  // Favorites
  favorites() {
    return this.http.get(`${this.baseUrl}/favorites`);
  }

  // Filter by category
  filter(category: string) {
    return this.http.get(`${this.baseUrl}/category?category=${category}`);
  }

}
