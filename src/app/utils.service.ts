import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post';
import { User } from './user';
import { Task } from './task';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private http: HttpClient) {}
  sub: Subscription = new Subscription();

  //#region - user methods...
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
  //#endregion

  //#region - task methods

  //get
  getTasks() {
    return this.http.get('http://localhost:8000/api/tasks');
  }

  getUserTasks(id: String) {
    return this.http.get('http://localhost:8000/api/tasks/user/' + id);
  }

  getTask(id: String) {
    return this.http.get('http://localhost:8000/api/tasks/' + id);
  }

  getTaskByName(Name: String) {
    return this.http.get('http://localhost:8000/api/tasks/title/' + Name);
  }

  addTask(obj: Task) {
    return this.http.post('http://localhost:8000/api/tasks/', obj);
  }

  uptTask(id: String, obj: Task) {
    return this.http.put('http://localhost:8000/api/tasks/' + id, obj);
  }

  //delete
  delTask(id: String) {
    return this.http.delete('http://localhost:8000/api/tasks/' + id);
  }

  delUserTasks(id: String) {
    return this.http.delete('http://localhost:8000/api/tasks/user/' + id);
  }
  //#endregion

  //#region - post methods
  getPosts() {
    return this.http.get('http://localhost:8000/api/posts');
  }

  getUserPosts(id: String) {
    return this.http.get('http://localhost:8000/api/posts/user/' + id);
  }

  getPost(id: String) {
    return this.http.get('http://localhost:8000/api/posts/' + id);
  }

  getPostByName(Name: String) {
    return this.http.get('http://localhost:8000/api/posts/title/' + Name);
  }

  addPost(obj: Post) {
    return this.http.post('http://localhost:8000/api/posts/', obj);
  }

  uptPost(id: String, obj: Post) {
    return this.http.put('http://localhost:8000/api/posts/' + id, obj);
  }

  delPost(id: String) {
    return this.http.delete('http://localhost:8000/api/posts/' + id);
  }

  delUserPosts(id: String) {
    return this.http.delete('http://localhost:8000/api/posts/user/' + id);
  }
  //#endregion

  async markCompleted(id: String) {
    this.sub = this.getUserTasks(id).subscribe((tasks: any) => {
      console.log(
        tasks.reduce((allCompleted: any, task: Task) => {
          console.log(task);
          return task.Status ? allCompleted : false;
        }, true)
      );
    });
  }
}
