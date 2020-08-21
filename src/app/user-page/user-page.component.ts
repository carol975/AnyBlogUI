import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BloggerService, BloggerInfo } from 'src/app/services/blogger.service';
import { ActivatedRoute } from '@angular/router';
import { NgbAccordion, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { PostService, Post } from '../services/post.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit, OnDestroy {
  @ViewChild('user_page_acc', { static: true }) accordion: NgbAccordion;

  bloggerInfo: BloggerInfo;
  openedPanel = new Set()

  constructor(
    private bloggerService: BloggerService,
    private route: ActivatedRoute,
    private _postService: PostService,
    private datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let username = params.get('username');
      this.bloggerService.getUserInfo(username).subscribe((bloggerInfo: BloggerInfo) => {
        this.bloggerInfo = bloggerInfo;
        console.log(this.bloggerInfo.posts.items);
        console.log(bloggerInfo);

      })
    })
  }

  ngOnDestroy():void{
    this.accordion.collapseAll();
  }

  addOpenPanel(index: number) {
    console.log(index)
    console.log(this.bloggerInfo.posts.items);
    console.log(this.bloggerInfo.posts.items[index])
    //load content only once
    if (this.bloggerInfo.posts.items[index].content == null) {
      this._postService.get_post(this.bloggerInfo.posts.items[index].post_id).subscribe((fullPost: Post) => {
        console.log(fullPost);
        this.bloggerInfo.posts.items[index].content = fullPost.content;
        this.bloggerInfo.posts.items[index].date_posted = fullPost.date_posted;
        this.bloggerInfo.posts.items[index].author_username = fullPost.author_username;
        this.bloggerInfo.posts.items[index].author_user_id = fullPost.author_user_id;
        this.bloggerInfo.posts.items[index].author_profile_picture = fullPost.author_profile_picture;
        this.openedPanel.add(index);
      });
    }
    else {
      this.openedPanel.add(index);
    }
    console.log(this.bloggerInfo.posts.items[index]);
  }

  removeOpenPanel(index: number) {
    this.openedPanel.delete(index);
  }

  toLocaleDate(date: Date) {
    return this.datepipe.transform(date, 'yyyy-MM-dd')
  }

  panelStateChange(event: NgbPanelChangeEvent) {
    console.log('panel change', event);
    if (event.nextState == false) {
      this.removeOpenPanel(parseInt(event.panelId));
    }
    else {
      this.addOpenPanel(parseInt(event.panelId))
    }
  }


}
