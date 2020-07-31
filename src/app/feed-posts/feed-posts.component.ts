import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PostService, Post, PostList } from 'src/app/services/post.service';
import { NgbPanelChangeEvent, NgbAccordion } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-feed-posts',
  templateUrl: './feed-posts.component.html',
  styleUrls: ['./feed-posts.component.css']
})
export class FeedPostsComponent implements OnInit {
  @ViewChild('a', {static : true}) accordion: NgbAccordion;
  posts:Post[] = [];
  postsDetail = {};
  openedPanel = new Set()
  constructor(private _postService: PostService,
              private datepipe: DatePipe) { }

  ngOnInit(): void {
    this._postService.get_feed_posts().subscribe((result: PostList)=> {
      console.log(result);
      this.posts = result.items;
    })
  }

  addOpenPanel(index: number){
    this.openedPanel.add(index);

    //load content only once
    if(this.posts[index].content == null){
      this._postService.get_post(this.posts[index].post_id).subscribe((fullPost: Post)=>{
        console.log(fullPost);
        this.posts[index].content = fullPost.content;
        this.posts[index].date_posted = fullPost.date_posted;
        this.posts[index].author_username = fullPost.author_username;
        this.posts[index].author_user_id = fullPost.author_user_id;
        this.posts[index].author_profile_picture = fullPost.author_profile_picture;
      });
    }
    console.log(this.posts[index]);
    
    
  }

  removeOpenPanel(index: number){
    this.openedPanel.delete(index);
  }

  toLocaleDate(date:Date){
    return this.datepipe.transform(date, 'yyyy-MM-dd')
  }

  panelStateChange(event:NgbPanelChangeEvent){
    console.log('panel change', event);
    let post_index = parseInt(event.panelId.charAt(event.panelId.length-1));
    if(event.nextState==false){
      this.removeOpenPanel(post_index);
    }
    else{
      this.addOpenPanel(post_index)
    }
  }
}
