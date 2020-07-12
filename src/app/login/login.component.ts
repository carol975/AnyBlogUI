import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginInfo = {
    "email": "",
    "password": "",
    "remember": false
  }
  constructor(
    private loginService: AuthenticationService,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit(): void {  }
  onSubmit() {
    this.loginService.login(this.loginInfo.email, this.loginInfo.password, String(this.loginInfo.remember)).subscribe(res => {
      console.log(res)
    },
    error => {
      console.log("errrrrr",error)
      this.flashMessagesService.show('Wrong Email or Password!', { cssClass: 'alert-danger mt-2', timeout: 2500 });

    })
  }

}
