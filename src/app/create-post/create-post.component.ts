import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import MediumEditor from 'medium-editor';
import { NavbarEventService } from '../services/navbar-event.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit, AfterViewInit {

  @ViewChild('editable') editable: ElementRef;

  editor;
  constructor(
    private navbarEventService: NavbarEventService,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.navbarEventService.publish_evt.subscribe(_ => {
      this.publish();
    })
  }
  ngAfterViewInit(): void {
    this.initEditor();

  }

  initEditor() {
    const edit = this.editable.nativeElement;
    this.editor = new MediumEditor(edit, {
      toolbar: {
        buttons: ['bold', 'italic', 'quote', 'anchor', 'image', 'removeFormat']
      },
      autoLink: true,
      extensionse: {
        imageDragging: false
      }
    });
  }

  publish() {
    console.log(this.editor.getContent());
    this.postService.publish_post("new", String(this.editor.getContent())).subscribe(error=>{
      console.log(error);
    })
  }

  save_post() {
    console.log(this.editor.getContent())
  }

}
