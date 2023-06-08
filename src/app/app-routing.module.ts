import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { TaskManagerComponent } from './components/task-manager/task-manager.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: ':userId', component: TaskManagerComponent },
];

@NgModule({
  imports: [  AppRoutingModule
,    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
