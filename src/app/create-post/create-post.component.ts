import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import MediumEditor from 'medium-editor';
import { NavbarEventService } from '../services/navbar-event.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  @ViewChild('editable') editable: ElementRef;

  title = "";
  content = "New Post";
  constructor(
    private navbarEventService: NavbarEventService,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.navbarEventService.publish_evt.subscribe(_ => {
      this.publish();
    })
  }

  publish() {
    console.log(this.content);
    this.postService.publish_post(this.title, String(this.content)).subscribe(error=>{
      console.log(error);
    })
  }

  // save_post() {
  //   console.log(this.editor.getContent())
  // }

}
