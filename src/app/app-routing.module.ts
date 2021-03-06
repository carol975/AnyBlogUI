import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service'
import { UpdatePostComponent } from './update-post/update-post.component';
import { UserPageComponent } from './user-page/user-page.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'logout', component:LogoutComponent},
  {path:'new', component: CreatePostComponent, canActivate: [AuthGuard]},
  {path:'update/:postID', component:UpdatePostComponent},
  {path:'user/:username', component:UserPageComponent},
  {path:'signup', component:SignupComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
