import { Component, OnInit, Input } from '@angular/core';
import {BloggerService, BloggerInfo} from 'src/app/services/blogger.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  bloggerInfo:BloggerInfo;

  constructor(
    private bloggerService:BloggerService,
    private route:ActivatedRoute
  )  { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      let username = params.get('username');
      this.bloggerService.getUserInfo(username).subscribe((bloggerInfo: BloggerInfo)=>{
        console.log(bloggerInfo);
      })
    })
  }

}
