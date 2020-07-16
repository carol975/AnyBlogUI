import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';

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

  returnUrl: string;
  constructor(
    private loginService: AuthenticationService,
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void { 
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
   }
  onSubmit() {
    this.loginService.login(this.loginInfo.email, this.loginInfo.password, String(this.loginInfo.remember)).subscribe(res => {
      this.router.navigateByUrl(this.returnUrl) || '/';
      
    },
    error => {
      this.flashMessagesService.show('Wrong Email or Password!', { cssClass: 'alert-danger mt-2', timeout: 2500 });
      
    })
  }

}
