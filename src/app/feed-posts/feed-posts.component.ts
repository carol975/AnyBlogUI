import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PostService, Post, PostList } from 'src/app/services/post.service';
import { NgbPanelChangeEvent, NgbAccordion } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-feed-posts',
  templateUrl: './feed-posts.component.html',
  styleUrls: ['./feed-posts.component.css']
})
export class FeedPostsComponent implements OnInit, OnDestroy {
  @ViewChild('feed_posts_acc', { static: true }) accordion: NgbAccordion;
  posts: Post[] = [];
  postsDetail = {};
  openedPanel = new Set()
  constructor(private _postService: PostService,
    private datepipe: DatePipe) { }

  ngOnInit(): void {
    this._postService.get_feed_posts().subscribe((result: PostList) => {
      console.log(result);
      this.posts = result.items;
    })
  }

  ngOnDestroy(): void{
    this.accordion.collapseAll();
  }

  addOpenPanel(index: number) {

    //load content only once
    if (this.posts[index].content == null) {
      this._postService.get_post(this.posts[index].post_id).subscribe((fullPost: Post) => {
        console.log(fullPost);
        this.posts[index].content = fullPost.content;
        this.posts[index].date_posted = fullPost.date_posted;
        this.posts[index].author_username = fullPost.author_username;
        this.posts[index].author_user_id = fullPost.author_user_id;
        this.posts[index].author_profile_picture = fullPost.author_profile_picture;
        this.openedPanel.add(index);
      });
    }
    else {
      this.openedPanel.add(index);
    }
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
