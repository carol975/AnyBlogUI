import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { UserService, SignUpForm } from 'src/app/services/user.service'; 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupInfo: SignUpForm = {
    "username": "",
    "email": "",
    "password": "",
    "confirm_password": ""
  }
  constructor(
    private flashMessageService: FlashMessagesService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void { }

  onSubmit(){
    this.userService.signup(this.signupInfo).subscribe(res=>{
      this.router.navigate(['login']);
    },
    error => {
      console.log(error)
      this.flashMessageService.show(error);
    })
  }

}
