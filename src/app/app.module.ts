import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FeedPostsComponent } from './feed-posts/feed-posts.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { CreatePostComponent } from './create-post/create-post.component';
import { LoginComponent } from './login/login.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { LogoutComponent } from './logout/logout.component';
import { AuthenticationService } from './services/authentication.service';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { UpdatePostComponent } from './update-post/update-post.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserPageComponent } from './user-page/user-page.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FeedPostsComponent,
    CreatePostComponent,
    LoginComponent,
    LogoutComponent,
    UpdatePostComponent,
    UserPageComponent,
    SignupComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    MatTabsModule,
    HttpClientModule,
    MatExpansionModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(), NgbModule,
  ],
  providers: [DatePipe, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
