import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PostService } from 'src/app/services/post.service';

export interface Post {
  author_username?:string,
  author_profile_picture?: string,
  title: string,
  date_posted?: Date,
  content?: string,
  summary: string,
  author_user_id?: string,
  post_id: string,
}

export interface PostList {
  curr_page: number,
  total_page: number,
  items: Post[]
}

@Component({
  selector: 'app-feed-posts',
  templateUrl: './feed-posts.component.html',
  styleUrls: ['./feed-posts.component.css']
})
export class FeedPostsComponent implements OnInit {
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
}
