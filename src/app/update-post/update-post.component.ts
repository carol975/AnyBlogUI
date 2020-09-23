import { Component, OnInit, Input } from '@angular/core';
import { PostService, Post } from '../services/post.service';
import { NavbarEventService } from '../services/navbar-event.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {
  postID: string;
  title = '';
  content='';
  constructor(
    private postService: PostService, 
    private navbarEventService: NavbarEventService,
    private route:ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.postID = params.get('postID');
      this.postService.get_post(this.postID).subscribe((post:Post)=>{
        this.title = post.title,
        this.content = post.content;
      })
    })
    this.navbarEventService.publish_evt.subscribe(_ => {
      this.updatePost();
    });
  }

  updatePost() {
    console.log('update post',this.content);
    this.postService.update_post(this.title, String(this.content), this.postID).subscribe(error=>{
      console.log(error);
    })
  }

}
