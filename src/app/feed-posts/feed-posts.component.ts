import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

export interface Post {
  username:string,
  profile_picture: string,
  title: string,
  date_posted: Date,
  content: string
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
  openedPanel = new Set()
  constructor(private _postService: PostService) { }

  ngOnInit(): void {
    this._postService.get_feed_posts().subscribe((result: PostList)=> {
      console.log(result);
      this.posts = result.items;
    })
  }

  addOpenPanel(index: number){
    this.openedPanel.add(index);
  }

  removeOpenPanel(index: number){
    this.openedPanel.delete(index);
  }

}
