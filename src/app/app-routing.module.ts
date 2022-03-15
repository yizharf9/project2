import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AddpersonComponent } from './addperson/addperson.component';
import { PostsComponent } from './posts/posts.component';
import { TasksPostsComponent } from './tasks-posts/tasks-posts.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users/users.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'task-post/:id', component: TasksPostsComponent },
  { path: 'add', component: AddpersonComponent },
  { path: '', component: WelcomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
