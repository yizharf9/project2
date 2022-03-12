import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get('http://localhost:8000/api/users');
  }

  getUser(id: String) {
    return this.http.get('http://localhost:8000/api/users/' + id);
  }

  getUserByName(Name: String) {
    return this.http.get('http://localhost:8000/api/users/name/' + Name);
  }

  addUser(obj: User) {
    return this.http.post('http://localhost:8000/api/users/', obj);
  }

  uptUser(id: String, obj: User) {
    return this.http.put('http://localhost:8000/api/users/' + id, obj);
  }

  delUser(id: String) {
    return this.http.delete('http://localhost:8000/api/users/' + id);
  }
}
